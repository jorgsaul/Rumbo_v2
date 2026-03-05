import { post } from "@/lib";
import { LoginCredentials, RegisterData } from "../types/auth.types";
import { ApiResponse } from "@/types/api.types";
import { User } from "@/types/user.types";

export const authService = {
  login: async (credentials: LoginCredentials) =>
    post<ApiResponse<User>>("/auth/login", credentials),
  signup: async (userData: RegisterData) =>
    post<ApiResponse<User>>("/auth/register", userData),
  googleLogin: async (idToken: string) =>
    post<ApiResponse<User>>("/auth/google", { idToken }),
};
