"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button, Input } from "@/components/ui";
import Card from "@/components/ui/Card";
import useLogin from "../hooks/useLogin";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../../../../public/Logo-blanco.png";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "Ingresa tu contraseña"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login, googleLogin, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    await login(data);
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-6">
      <div className="flex lg:hidden justify-center">
        <Image
          src={logo}
          alt="Rumbo"
          width={50}
          height={50}
          className="invert dark:invert-0"
        />
      </div>

      <Card className="flex flex-col gap-2" shadow="sm">
        <div className="flex flex-col gap-1 mb-2">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Bienvenido de nuevo
          </h2>
          <p className="text-sm text-neutral-500">
            Inicia sesión para continuar
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

          <Input
            {...register("password")}
            title="Contraseña"
            label="Tu contraseña"
            icon={Lock}
            iconPosition="left"
            inputSize="md"
            type="password"
            error={errors.password?.message}
          />

          <div className="flex justify-end">
            <Link
              href="/recovery"
              className="text-xs text-primary hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {error && (
            <p className="text-sm text-danger text-center mt-1">{error}</p>
          )}

          <div className="relative flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
            <span className="text-xs text-neutral-400">o</span>
            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
          </div>

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                googleLogin(credentialResponse.credential);
              }
            }}
            onError={() => console.error(error)}
            width="100%"
            text="signin_with"
            shape="rectangular"
            theme="outline"
          />

          <Button
            type="submit"
            fullWidth
            size="md"
            loading={isLoading}
            className="mt-2"
          >
            Iniciar sesión
          </Button>
        </form>
      </Card>

      <p className="text-center text-sm text-neutral-500">
        ¿No tienes cuenta?{" "}
        <Link
          href="/register"
          className="text-primary font-medium hover:underline"
        >
          Regístrate
        </Link>
      </p>
    </div>
  );
}
