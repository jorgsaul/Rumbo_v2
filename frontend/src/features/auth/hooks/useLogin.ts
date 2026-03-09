import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./useAuthStore";
import { authService } from "../services/authServices";
import { LoginCredentials } from "../types/auth.types";
import Cookies from "js-cookie";

export default function useLogin() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.login(credentials);
      if (res.ok) {
        setUser(res.response);
        Cookies.set("auth-client", res.response.id, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        router.push("/feed");
      } else {
        setError(res.message);
      }
    } catch {
      setError("Verifica tus credenciales");
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (idToken: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.googleLogin(idToken);
      if (res.ok) {
        setUser(res.response);
        Cookies.set("auth-client", res.response.id, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        router.push("/feed");
      }
    } catch {
      setError("Error al iniciar sesión con Google");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, googleLogin, isLoading, error };
}
