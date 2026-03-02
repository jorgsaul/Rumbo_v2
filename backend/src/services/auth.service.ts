import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { RegisterData, LoginCredentials } from "../types/auth.types";
import { OAuth2Client } from "google-auth-library";

export const registerService = async (data: RegisterData) => {
  const { username, email, password, role, educationLevel } = data;
  const exists = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (exists) throw new Error("El email o usuario ya está registrado");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
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
