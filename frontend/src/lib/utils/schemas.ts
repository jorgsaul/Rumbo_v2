import * as z from "zod";

export const emailSchema = z.email("Email inválido");
export const passwordSchema = z.string().min(8, "Mínimo 8 caracteres");
export const codeSchema = z
  .string()
  .length(6, "El código debe tener 6 dígitos");
