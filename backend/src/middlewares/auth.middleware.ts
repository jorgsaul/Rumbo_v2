import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

export interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ ok: false, message: "No autorizado" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, role: true, isActive: true },
    });

    /*
    if (!user?.isVerified && req.path !== "/verify-email") {
      res.status(403).json({
        ok: false,
        message: "Verifica tu correo primero",
        code: "UNVERIFIED",
      });
      return;
    }*/

    if (!user) {
      res.status(401).json({ ok: false, message: "Usuario no encontrado" });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({ ok: false, message: "Cuenta desactivada" });
      return;
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch {
    res.status(401).json({ ok: false, message: "Token inválido" });
  }
};

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.userRole !== "ADMIN") {
    res.status(403).json({ ok: false, message: "Acceso denegado" });
    return;
  }
  next();
};
