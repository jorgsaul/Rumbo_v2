"use client";
import { createContext, useState, ReactNode, useContext, useRef, useCallback } from "react";

export interface Confirmation {
  title: string;
  description: string;
  category: "danger" | "warning" | "info" | "success";
}

interface ConfirmationContextType {
  confirmation: Confirmation | undefined;
  confirm: (confirmation: Confirmation) => Promise<boolean>;
  resolve: (value: boolean) => void;
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);

export default function ConfirmationProvider({ children }: { children: ReactNode }) {
  const [confirmation, setConfirmation] = useState<Confirmation | undefined>(undefined);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((data: Confirmation): Promise<boolean> => {
    setConfirmation(data);
    return new Promise((res) => {
      resolveRef.current = res;
    });
  }, []);

  const resolve = useCallback((value: boolean) => {
    resolveRef.current?.(value);
    setConfirmation(undefined);
  }, []);

  return (
    <ConfirmationContext.Provider value={{ confirmation, confirm, resolve }}>
      {children}
    </ConfirmationContext.Provider>
  );
}

export function useConfirmation() {
  const context = useContext(ConfirmationContext);
  if (!context)
    throw new Error("useConfirmation debe usarse dentro de ConfirmationProvider");
  return context;
}