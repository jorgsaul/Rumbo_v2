import { Request, Response } from "express";
import {
  registerService,
  loginService,
  verifyCodeService,
  sendVerificationCodeService,
  forgotPasswordService,
  googleAuthService,
  resetPasswordService,
} from "../services/auth.service";

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
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 dias
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

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    const { user, token } = await googleAuthService(idToken);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ ok: true, message: "Login con Google exitoso", response: user });
  } catch (error: any) {
    res.status(401).json({ ok: false, message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    await forgotPasswordService(req.body.email);
    res.json({
      ok: true,
      message: "Si el correo existe, recibirás instrucciones",
    });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    await resetPasswordService(req.body.token, req.body.password);
    res.json({ ok: true, message: "Contraseña actualizada" });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const sendVerificationCode = async (req: Request, res: Response) => {
  try {
    await sendVerificationCodeService(req.body.email);
    res.json({ ok: true, message: "Código enviado" });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const verifyCode = async (req: Request, res: Response) => {
  try {
    await verifyCodeService(req.body.email, req.body.code);
    res.json({ ok: true, message: "Código verificado" });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};
