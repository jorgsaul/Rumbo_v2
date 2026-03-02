import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
}

export const authMiddleware = (
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
