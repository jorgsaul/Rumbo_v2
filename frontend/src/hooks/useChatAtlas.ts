import { useState, useRef, useEffect, useCallback } from "react";
import { enviarMensajeAtlas } from "../features/atlas/services/chat.services";
import type { MensajeAtlas } from "../features/atlas/types/chat.types";

const PALABRAS_BLOQUEADAS = [
  'puta', 'puto', 'mierda', 'cabron', 'cabrón', 'pendejo', 'pendeja',
  'chinga', 'chingo', 'verga', 'culero', 'culera', 'idiota', 'imbecil',
  'imbécil', 'estupido', 'estúpido', 'joder', 'coño', 'pinche',
  'mamadas', 'hdp', 'fuck', 'shit', 'bitch', 'asshole', 'wtf'
];

const validarMensaje = (texto: string): string | null => {
  if (!texto.trim()) return null;
  if (texto.length > 500) return 'El mensaje es demasiado largo (máx. 500 caracteres).';
  const lower = texto.toLowerCase();
  const tieneGroseria = PALABRAS_BLOQUEADAS.some(p => lower.includes(p));
  if (tieneGroseria) return 'Por favor usa un lenguaje respetuoso 😊';
  return null;
};

export function useChatAtlas(userId: string) {
  const [mensajes, setMensajes] = useState<MensajeAtlas[]>([]);
  const [cargando, setCargando] = useState(false);
  const [input, setInput] = useState("");
  const [errorInput, setErrorInput] = useState<string | null>(null);
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
      const textoBase = typeof textoDirecto === "string" ? textoDirecto : input;
      const texto = textoBase.trim();

      if (!texto || cargando) return;

      const error = validarMensaje(texto);
      if (error) {
        setErrorInput(error);
        return;
      }

      setErrorInput(null);
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
    errorInput,
    bottomRef,
    textareaRef,
    enviar,
    handleKeyDown,
  };
}