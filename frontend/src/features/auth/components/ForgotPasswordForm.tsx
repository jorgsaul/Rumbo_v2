"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import Card from "@/components/ui/Card";
import { authService } from "../services/authServices";

const schema = z.object({
  email: z.string().email("Correo inválido"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      setSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <Card className="flex flex-col gap-3" shadow="sm">
        <div className="flex flex-col gap-1 mb-2">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Revisa tu correo
          </h2>
          <p className="text-sm text-neutral-500">
            Si existe una cuenta con ese correo, recibirás un enlace en los
            próximos minutos.
          </p>
        </div>
        <p className="text-xs text-neutral-400 bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
          Si no llega, revisa tu carpeta de spam.
        </p>
        <Link
          href="/login"
          className="text-xs text-primary hover:underline text-center mt-2"
        >
          ← Volver al inicio de sesión
        </Link>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-2" shadow="sm">
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Recupera tu contraseña
        </h2>
        <p className="text-sm text-neutral-500">
          Ingresa tu correo y te enviaremos un enlace para restablecerla.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          {...register("email")}
          title="Correo electrónico"
          label="correo@ejemplo.com"
          icon={Mail}
          iconPosition="left"
          inputSize="md"
          type="email"
          error={errors.email?.message}
        />
        <Button
          type="submit"
          fullWidth
          size="md"
          loading={isLoading}
          className="mt-2"
        >
          Enviar enlace
        </Button>
      </form>

      <Link
        href="/login"
        className="text-xs text-primary hover:underline text-center mt-1"
      >
        ← Volver al inicio de sesión
      </Link>
    </Card>
  );
}
