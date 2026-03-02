"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, OTPInput } from "@/components/ui";
import useRegister from "../hooks/useRegister";

const step3Schema = z.object({
  code: z.string().length(6, "El código debe tener 6 dígitos"),
});

type Step3Data = z.infer<typeof step3Schema>;

export default function RegisterStep3() {
  const { data, nextStep, previousStep } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: { code: "" },
  });

  const onSubmit = (_data: Step3Data) => {
    // El código se valida aquí
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Revisa tu correo
        </h2>
        <p className="text-sm text-neutral-500">
          Enviamos un código a{" "}
          <span className="text-primary font-medium">{data.email}</span>
        </p>
      </div>

      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <OTPInput
            value={field.value}
            onChange={field.onChange}
            error={errors.code?.message}
          />
        )}
      />

      <p className="text-xs text-neutral-400 text-center">
        ¿No llegó el código?{" "}
        <button type="button" className="text-primary hover:underline">
          Reenviar
        </button>
      </p>

      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" size="sm" type="button" onClick={previousStep}>
          ← Regresar
        </Button>
        <Button type="submit" size="sm">
          Verificar →
        </Button>
      </div>
    </form>
  );
}
