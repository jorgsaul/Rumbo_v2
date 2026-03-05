import { UserRole } from "@/types/user.types";

export interface RegisterData {
  role: UserRole;
  email: string;
  username: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type RegisterStep = "Step1" | "Step2" | "Step3" | "Step4";
