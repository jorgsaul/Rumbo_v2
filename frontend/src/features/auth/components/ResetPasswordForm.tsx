"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import Card from "@/components/ui/Card";
import { authService } from "../services/authServices";

const schema = z
  .object({
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"],
  });

type FormData = z.infer<typeof schema>;

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.resetPassword(token, data.password);
      router.push("/login");
    } catch (e: any) {
      setError(
        e.response?.data?.message ?? "Error al restablecer la contraseña",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col gap-2" shadow="sm">
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Nueva contraseña
        </h2>
        <p className="text-sm text-neutral-500">
          Elige una contraseña segura para tu cuenta.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          {...register("password")}
          title="Nueva contraseña"
          label="••••••••"
          icon={Lock}
          iconPosition="left"
          inputSize="md"
          type="password"
          error={errors.password?.message}
        />
        <Input
          {...register("confirm")}
          title="Confirmar contraseña"
          label="••••••••"
          icon={Lock}
          iconPosition="left"
          inputSize="md"
          type="password"
          error={errors.confirm?.message}
        />
        {error && <p className="text-sm text-danger text-center">{error}</p>}
        <Button
          type="submit"
          fullWidth
          size="md"
          loading={isLoading}
          className="mt-2"
        >
          Restablecer contraseña
        </Button>
      </form>
    </Card>
  );
}
