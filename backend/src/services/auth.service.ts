import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { RegisterData, LoginCredentials } from "../types/auth.types";
import { OAuth2Client } from "google-auth-library";
import { resend, sendVerificationEmail, sendResetEmail } from "../lib/resend";
import crypto from "node:crypto";

export const registerService = async (data: RegisterData) => {
  const { username, email, password, role, educationLevel } = data;
  const exists = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (exists) throw new Error("El email o usuario ya está registrado");

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: await bcrypt.hash(password, 10),
      fullName: username,
      role,
      educationLevel,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      educationLevel: true,
    },
  });

  await prisma.pendingVerification.delete({ where: { email } });

  return user;
};

export const loginService = async (data: LoginCredentials) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("Credenciales incorrectas");

  if (!user.password)
    throw new Error("Esta cuenta usa google para iniciar sesion");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Credenciales incorrectas");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthService = async (idToken: string) => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID!,
  });

  const payload = ticket.getPayload();
  if (!payload?.email) throw new Error("Token de Google inválido");

  const { email, sub: googleId, name, picture } = payload;

  // Buscar usuario existente por googleId o email
  let user = await prisma.user.findFirst({
    where: { OR: [{ googleId }, { email }] },
  });

  if (user) {
    // Si existe por email pero no tiene googleId, vincularlo
    if (!user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId,
          provider: "google",
          avatarUrl: picture ?? user.avatarUrl,
        },
      });
    }
  } else {
    // Crear usuario nuevo
    const username =
      email.split("@")[0] + "_" + Math.random().toString(36).slice(2, 6);
    user = await prisma.user.create({
      data: {
        email,
        googleId,
        provider: "google",
        username,
        fullName: name ?? username,
        avatarUrl: picture,
        role: "STUDENT",
      },
    });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

export const forgotPasswordService = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return;

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: token, resetTokenExpiry: expiry },
  });

  await sendResetEmail(email, token);
};

export const resetPasswordService = async (
  token: string,
  newPassword: string,
) => {
  const user = await prisma.user.findFirst({
    where: { resetToken: token },
  });

  if (!user) throw new Error("Token inválido");
  if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date())
    throw new Error("Token expirado");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: await bcrypt.hash(newPassword, 10),
      resetToken: null,
      resetTokenExpiry: null,
    },
  });
};

export const sendVerificationCodeService = async (email: string) => {
  // Verificar si ya existe cuenta con ese email
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Este correo ya está registrado");

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 15 * 60 * 1000);

  // Guardar en tabla temporal o en cache — como no hay usuario aún,
  // guárdalo en una tabla PendingVerification
  await prisma.pendingVerification.upsert({
    where: { email },
    update: { code, expiry },
    create: { email, code, expiry },
  });

  await sendVerificationEmail(email, code);
};

export const verifyCodeService = async (email: string, code: string) => {
  const pending = await prisma.pendingVerification.findUnique({
    where: { email },
  });
  if (!pending) throw new Error("Código no encontrado");
  if (pending.code !== code) throw new Error("Código incorrecto");
  if (pending.expiry < new Date()) throw new Error("Código expirado");
  // No borramos aún — se borra al completar el registro
};
