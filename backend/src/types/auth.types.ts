import { ProfileType, Role } from "@prisma/client";

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: Role;
  profileType?: ProfileType;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
