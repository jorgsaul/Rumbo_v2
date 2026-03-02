import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { RegisterData, LoginCredentials } from "../types/auth.types";

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
