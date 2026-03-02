import { Request, Response } from "express";
import { registerService, loginService } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerService(req.body);
    res
      .status(201)
      .json({ ok: true, message: "Usuario creado", response: user });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await loginService(req.body);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ ok: true, message: "Login exitoso", response: user });
  } catch (error: any) {
    res.status(401).json({ ok: false, message: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ ok: true, message: "Sesión cerrada" });
};
