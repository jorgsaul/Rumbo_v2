import { emailSchema, passwordSchema } from "@/lib/utils/schemas";
import * as z from "zod";

export const step2Schema = z.object({ email: emailSchema });
export const step4Schema = z.object({
  username: z.string().min(3),
  password: passwordSchema,
});
