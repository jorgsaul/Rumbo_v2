"use client";

import useRegister from "./hooks/useRegister";
import RegisterStep1 from "./components/Step1";
import RegisterStep2 from "./components/Step2";
import RegisterStep3 from "./components/Step3";
import RegisterStep4 from "./components/Step4";
import RegisterStepper from "./components/RegisterStepper";

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
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Crear cuenta
        </h1>
        <RegisterStepper currentStep={currentStep} />
      </div>
      <div className="min-h-48">{STEPS[step]}</div>
    </div>
  );
}
