import { create } from "zustand";
import { RegisterData, RegisterStep } from "../types/auth.types";

interface RegisterStore {
  step: RegisterStep;
  data: RegisterData;
  setStep: (step: RegisterStep) => void;
  setData: (data: Partial<RegisterData>) => void;
  reset: () => void;
}

const initialData: RegisterData = {
  role: "STUDENT",
  username: "",
  email: "",
  password: "",
};

export const useRegisterStore = create<RegisterStore>((set) => ({
  step: "Step1",
  data: initialData,
  setStep: (step) => set({ step }),
  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  reset: () => set({ step: "Step1", data: initialData }),
}));
