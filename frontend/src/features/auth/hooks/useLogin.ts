import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./useAuthStore";
import { authService } from "../services/authServices";
import { LoginCredentials } from "../types/auth.types";

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

  return { login, isLoading, error };
}
