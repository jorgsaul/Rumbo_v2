export type UserRole = "ADMIN" | "STUDENT" | "AUTHOR";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
}

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

export interface Response<T> {
  response: T;
  message: string;
  ok: boolean;
}
