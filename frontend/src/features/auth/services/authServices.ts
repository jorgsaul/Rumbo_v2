import { post, api } from "@/lib";
import { LoginCredentials, RegisterData } from "../types/auth.types";
import { ApiResponse } from "@/types/api.types";
import { LoginResponse, User } from "@/types/user.types";

export const authService = {
  login: async (credentials: LoginCredentials) =>
    post<ApiResponse<LoginResponse>>("/auth/login", credentials),
  signup: async (userData: RegisterData) =>
    post<ApiResponse<User>>("/auth/register", userData),
  googleLogin: async (idToken: string) =>
    post<ApiResponse<LoginResponse>>("/auth/google", { idToken }),
  sendVerificationCode: async (email: string) => {
    try {
      const { data } = await api.post<ApiResponse<null>>("/auth/send-code", {
        email,
      });
      return data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? "Error al enviar el código",
      );
    }
  },
  verifyCode: async (email: string, code: string) => {
    const { data } = await api.post<ApiResponse<null>>("/auth/verify-code", {
      email,
      code,
    });
    return data;
  },
  forgotPassword: async (email: string) => {
    const { data } = await api.post<ApiResponse<null>>(
      "/auth/forgot-password",
      { email },
    );
    return data;
  },
  resetPassword: async (token: string, password: string) => {
    const { data } = await api.post<ApiResponse<null>>("/auth/reset-password", {
      token,
      password,
    });
    return data;
  },
};
