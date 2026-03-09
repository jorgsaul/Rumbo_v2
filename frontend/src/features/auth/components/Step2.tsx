"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail } from "lucide-react";
import { Button, Input } from "@/components/ui";
import useRegister from "../hooks/useRegister";

const step2Schema = z.object({
  email: z.string().email("Ingresa un correo válido"),
});

type Step2Data = z.infer<typeof step2Schema>;

export default function RegisterStep2() {
  const {
    data,
    setData,
    nextStep,
    step,
    previousStep,
    sendCode,
    isLoading,
    error,
  } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { email: data.email },
  });

  const onSubmit = async (formData: Step2Data) => {
    //await sendCode(formData.email);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          ¿Cuál es tu correo?
        </h2>
        <p className="text-sm text-neutral-500">
          Te enviaremos un código de verificación
        </p>
      </div>

      <Input
        {...register("email")}
        title="Correo electrónico"
        label="ejemplo@correo.com"
        icon={Mail}
        iconPosition="left"
        inputSize="md"
        error={errors.email?.message}
      />

      <div className="flex items-center justify-between mt-2">
        {step !== "Step1" && (
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={previousStep}
          >
            ← Regresar
          </Button>
        )}
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" size="sm" className="ml-auto" loading={isLoading}>
          Continuar →
        </Button>
      </div>
    </form>
  );
}
