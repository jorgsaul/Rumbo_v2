"use client";

import type { RadioOption } from "@/components/ui/RadioGroup";
import useRegister from "../hooks/useRegister";
import type { UserRole } from "../types/auth.types";
import { GraduationCap, BookOpen } from "lucide-react";
import { Button, RadioGroup } from "@/components/ui";

const ROLE_OPTIONS: RadioOption[] = [
  {
    value: "STUDENT",
    label: "Estudiante",
    description: "Quiero descubrir mi vocación profesional",
    icon: <GraduationCap size={18} />,
  },
  {
    value: "AUTHOR",
    label: "Autor de publicacones",
    description: "Quiero orientar a mis estudiantes",
    icon: <BookOpen size={18} />,
  },
];

export default function RegisterStep1() {
  const { data, setData, nextStep, previousStep, step } = useRegister();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.role) return;
    nextStep();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-primary uppercase tracking-widest">
          Paso 1 de 4
        </p>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          ¿Cuál es tu rol?
        </h2>
        <p className="text-sm text-neutral-500">
          Esto nos ayuda a personalizar tu experiencia
        </p>
      </div>

      <RadioGroup
        options={ROLE_OPTIONS}
        value={data.role}
        onChange={(value) => setData({ role: value as UserRole })}
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
        <Button type="submit" size="sm" className="ml-auto">
          Continuar →
        </Button>
      </div>
    </form>
  );
}
