"use client";
import { time } from "console";
import { createContext, useState, ReactNode, useContext, useRef } from "react";
export interface Toast {
  id: number;
  title: string;
  description: string;
  category: "danger" | "warning" | "info" | "success";
}

interface ToastTypeContext {
  toast: Toast | undefined;
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastTypeContext | undefined>(undefined);

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | undefined>(undefined);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const addToast = (toast: Omit<Toast, "id">) => {
    if (timeRef.current) clearTimeout(timeRef.current);
    const id = Date.now();
    setToast({ ...toast, id });
    timeRef.current = setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: number) => {
    setToast(undefined);
    timeRef.current = null;
  };

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("El context se debe usar dentro de un provider");
  return context;
}
