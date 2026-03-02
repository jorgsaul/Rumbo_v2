"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Lock } from "lucide-react";
import { Button, Input } from "@/components/ui";
import useRegister from "../hooks/useRegister";
import { useRouter } from "next/navigation";

const step4Schema = z
  .object({
    username: z.string().min(3, "Mínimo 3 caracteres"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type Step4Data = z.infer<typeof step4Schema>;

export default function RegisterStep4() {
  const { sendData, previousStep, isLoading, error } = useRegister();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
  });

  const onSubmit = async (formData: Step4Data) => {
    await sendData({
      username: formData.username,
      password: formData.password,
    });
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Crea tu cuenta
        </h2>
        <p className="text-sm text-neutral-500">
          Elige un nombre de usuario y contraseña
        </p>
      </div>

      <Input
        {...register("username")}
        title="Nombre de usuario"
        label="usuario123"
        icon={User}
        iconPosition="left"
        inputSize="md"
        error={errors.username?.message}
      />

      <Input
        {...register("password")}
        title="Contraseña"
        label="Mínimo 8 caracteres"
        icon={Lock}
        iconPosition="left"
        inputSize="md"
        type="password"
        error={errors.password?.message}
      />

      <Input
        {...register("confirmPassword")}
        title="Confirmar contraseña"
        label="Repite tu contraseña"
        icon={Lock}
        iconPosition="left"
        inputSize="md"
        type="password"
        error={errors.confirmPassword?.message}
      />

      {error && <p className="text-sm text-danger text-center">{error}</p>}

      <div className="flex items-center justify-between gap-3 mt-2">
        <Button variant="ghost" size="sm" type="button" onClick={previousStep}>
          ← Regresar
        </Button>
        <Button type="submit" size="sm" loading={isLoading}>
          Crear cuenta
        </Button>
      </div>
    </form>
  );
}
