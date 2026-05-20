import { useState, useRef, useEffect, useCallback } from "react";
import { enviarMensajeAtlas } from "../features/atlas/services/chat.services";
import type { MensajeAtlas } from "../features/atlas/types/chat.types";

export function useChatAtlas(userId: string) {
  const [mensajes, setMensajes] = useState<MensajeAtlas[]>([]);
  const [cargando, setCargando] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, cargando]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input]);

  const enviar = useCallback(
    async (textoDirecto?: string) => {
      // Ignorar si llega un SyntheticEvent (click del botón) en lugar de un string
      const textoBase = typeof textoDirecto === "string" ? textoDirecto : input;
      const texto = textoBase.trim();

      if (!texto || cargando) return;

      if (typeof textoDirecto !== "string") setInput("");

      const mensajeUsuario: MensajeAtlas = {
        role: "user",
        texto,
        timestamp: new Date(),
      };
      setMensajes((prev) => [...prev, mensajeUsuario]);
      setCargando(true);

      try {
        const data = await enviarMensajeAtlas(texto, userId);
        setMensajes((prev) => [
          ...prev,
          { role: "bot", texto: data.mensaje, timestamp: new Date() },
        ]);
      } catch {
        setMensajes((prev) => [
          ...prev,
          {
            role: "bot",
            texto: "No pude conectar con Atlas. Intenta de nuevo.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setCargando(false);
      }
    },
    [input, cargando, userId]
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviar();
    }
  }

  return {
    mensajes,
    cargando,
    input,
    setInput,
    bottomRef,
    textareaRef,
    enviar,
    handleKeyDown,
  };
}