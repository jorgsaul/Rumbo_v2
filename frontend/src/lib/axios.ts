import axios from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 40000,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const Cookies = (await import("js-cookie")).default;
      Cookies.remove("auth-client");
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const post = async <T>(url: string, data: unknown): Promise<T> => {
  const response = await api.post<T>(url, data);
  return response.data;
};

export const get = async <T>(url: string): Promise<T> => {
  const response = await api.get<T>(url);
  return response.data;
};

export const deletePop = async <T>(url: string): Promise<T> => {
  const response = await api.delete<T>(url);
  return response.data;
};

export const patch = async <T>(url: string, data: unknown): Promise<T> => {
  const response = await api.patch<T>(url, data);
  return response.data;
};
