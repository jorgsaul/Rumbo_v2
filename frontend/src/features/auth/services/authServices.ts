import { post } from "@/lib";
import { LoginCredentials, RegisterData, Response } from "../types/auth.types";
import { User } from "../types/auth.types";

export const authService = {
  login: async (credentials: LoginCredentials) =>
    post<Response<User>>("/auth/login", credentials),
  signup: async (userData: RegisterData) =>
    post<Response<User>>("/auth/register", userData),
  googleLogin: async (idToken: string) =>
    post<Response<User>>("/auth/google", { idToken }),
};
