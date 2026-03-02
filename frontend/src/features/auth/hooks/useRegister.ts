import { useRegisterStore } from "./useRegisterStore";
import { RegisterStep } from "../types/auth.types";
import { authService } from "../services/authServices";
import { useState } from "react";

export default function useRegister() {
  const { data, setData, setStep, reset, step } = useRegisterStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  const STEP_ORDER = {
    Step1: 1,
    Step2: 2,
    Step3: 3,
    Step4: 4,
  };

  const steps = Object.keys(STEP_ORDER) as RegisterStep[];
  const currentIndex = steps.indexOf(step);

  const nextStep = async () => {
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };
  const previousStep = () => {
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const sendData = async (extraData?: Partial<typeof data>) => {
    setIsLoading(true);
    const finalData = { ...data, ...extraData };
    try {
      await authService.signup(finalData);
      reset();
    } catch (error) {
      console.log(error);
      setError("Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    step,
    STEP_ORDER,
    nextStep,
    previousStep,
    setData,
    reset,
    sendData,
    isLoading,
    error,
  };
}
