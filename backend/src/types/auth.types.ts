import { EducationLevel, Role } from "@prisma/client";

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: Role;
  educationLevel?: EducationLevel;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
