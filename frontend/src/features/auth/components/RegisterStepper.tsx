"use client";

import { cn } from "@/lib";
import { Check } from "lucide-react";

const STEPS = [
  { label: "Tu rol", description: "Elige cómo quieres usar Rumbo" },
  { label: "Correo", description: "Ingresa tu correo electrónico" },
  { label: "Verificación", description: "Confirma tu email" },
  { label: "Tu cuenta", description: "Crea usuario y contraseña" },
];

export default function RegisterStepper({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="w-full">
      <div className="flex items-start justify-between relative">
        <div className="absolute top-3.5 left-0 right-0 flex items-center px-6 pointer-events-none">
          {STEPS.slice(0, -1).map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 h-px transition-colors duration-300",
                i + 1 < currentStep
                  ? "bg-primary"
                  : "bg-neutral-200 dark:bg-neutral-700",
              )}
            />
          ))}
        </div>

        {STEPS.map((step, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={i}
              className="flex flex-col items-center gap-2 z-10 flex-1"
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2",
                  isCompleted && "bg-primary border-primary text-white",
                  isCurrent &&
                    "bg-white dark:bg-neutral-900 border-primary text-primary",
                  !isCompleted &&
                    !isCurrent &&
                    "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-400",
                )}
              >
                {isCompleted ? <Check size={13} /> : stepNum}
              </div>

              <div className="flex flex-col items-center text-center gap-0.5 px-1">
                <p
                  className={cn(
                    "text-xs font-semibold leading-tight",
                    isCurrent
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-400",
                  )}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-neutral-400 leading-tight hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
