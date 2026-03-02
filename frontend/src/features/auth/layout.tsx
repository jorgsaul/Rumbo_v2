"use client";

import useRegister from "./hooks/useRegister";
import RegisterStep1 from "./components/Step1";
import RegisterStep2 from "./components/Step2";
import RegisterStep3 from "./components/Step3";
import RegisterStep4 from "./components/Step4";

const STEPS = {
  Step1: <RegisterStep1 />,
  Step2: <RegisterStep2 />,
  Step3: <RegisterStep3 />,
  Step4: <RegisterStep4 />,
};

const STEP_TITLES = {
  Step1: "Cuéntanos sobre ti",
  Step2: "Tu correo",
  Step3: "Verificación",
  Step4: "Crea tu cuenta",
};

export default function AuthRegisterLayout() {
  const { step } = useRegister();

  const totalSteps = Object.keys(STEPS).length;
  const currentStep = parseInt(step.replace("Step", ""));
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Crear cuenta
        </h1>

        <div className="flex flex-col gap-1.5">
          <div className="w-full h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-neutral-400">
            {currentStep} de {totalSteps} — {STEP_TITLES[step]}
          </p>
        </div>
      </div>

      <div className="min-h-48">{STEPS[step]}</div>
    </div>
  );
}
