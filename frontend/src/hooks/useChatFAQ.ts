"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { iniciarFAQ, enviarOpcionFAQ } from "../features/support/services/chat.service";

export interface OpcionFAQ {
  id: string;
  label: string;
}

export interface MensajeFAQ {
  role: "user" | "bot";
  texto: string;
  opciones?: OpcionFAQ[];
  timestamp: Date;
}

export function useChatFAQ() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<MensajeFAQ[]>([]);
  const [cargando, setCargando] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, cargando]);

  const toggleChat = useCallback(async () => {
    const nuevoEstado = !abierto;
    setAbierto(nuevoEstado);

    if (nuevoEstado && mensajes.length === 0) {
      setCargando(true);
      try {
        const data = await iniciarFAQ();
        const texto = data.message ?? data.mensaje ?? "";
        if (texto) {
          setMensajes([
            {
              role: "bot",
              texto,
              opciones: data.opciones ?? [],
              timestamp: new Date(),
            },
          ]);
        }
      } catch {
        setMensajes([
          {
            role: "bot",
            texto: "No pude conectar con el soporte. Intenta más tarde.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setCargando(false);
      }
    }
  }, [abierto, mensajes.length]);

  const seleccionarOpcion = useCallback(
    async (opcion: OpcionFAQ) => {
      if (cargando) return;

      setMensajes((prev) => [
        ...prev,
        {
          role: "user",
          texto: opcion.label,
          timestamp: new Date(),
        },
      ]);

      setCargando(true);

      try {
        const data = await enviarOpcionFAQ(opcion.id);
        const texto = data.message ?? data.mensaje ?? "";

        setMensajes((prev) => [
          ...prev,
          {
            role: "bot",
            texto: texto || "No tengo información sobre eso.",
            opciones: data.opciones ?? [],
            timestamp: new Date(),
          },
        ]);
      } catch {
        setMensajes((prev) => [
          ...prev,
          {
            role: "bot",
            texto: "Ocurrió un error. Intenta de nuevo.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setCargando(false);
      }
    },
    [cargando]
  );

  return {
    abierto,
    mensajes,
    cargando,
    bottomRef,
    toggleChat,
    seleccionarOpcion,
  };
}