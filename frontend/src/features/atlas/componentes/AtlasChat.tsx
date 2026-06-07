"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SendHorizonal } from "lucide-react";
import { useChatAtlas } from "@/hooks/useChatAtlas";
import type { MensajeAtlas } from "../types/chat.types";
import atlasImg from "../../../../public/atlas.png";

interface AtlasChatProps {
  userId: string;
}

export default function AtlasChat({ userId }: AtlasChatProps) {
  const { mensajes, input, setInput, enviar, cargando, errorInput } =
    useChatAtlas(userId);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [mensajes, cargando]);

  useEffect(() => {
    const ta = textareaRef.current;

    if (!ta) return;

    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviar();
    }
  };

  const isActive = input.trim().length > 0 && !cargando;

  return (
    <div className="flex h-full flex-col overflow-hidden border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={atlasImg}
              alt="Atlas"
              width={48}
              height={48}
              className="rounded-full border border-neutral-200 dark:border-neutral-700"
            />

            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-neutral-900" />
          </div>

          <div>
            <h2 className="font-semibold text-neutral-900 dark:text-white">
              Atlas
            </h2>

            <p className="text-sm text-neutral-500">
              Asistente de orientación vocacional
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        {mensajes.length === 0 && !cargando ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Image
              src={atlasImg}
              alt="Atlas"
              width={96}
              height={96}
              className="rounded-full"
            />

            <h2 className="mt-5 text-2xl font-bold text-neutral-900 dark:text-white">
              Hola, soy Atlas 👋
            </h2>

            <p className="mt-2 max-w-md text-sm text-neutral-500">
              Puedo ayudarte a interpretar tus resultados, explorar carreras
              universitarias y resolver dudas sobre tu futuro académico.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                "¿Qué carrera me recomiendas?",
                "¿Cómo interpreto mis resultados?",
                "Necesito orientación",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => enviar(s)}
                  className="
                    rounded-lg
                    border
                    border-neutral-200
                    px-3
                    py-2
                    text-sm
                    transition-colors
                    hover:border-primary
                    hover:text-primary
                    dark:border-neutral-700
                  "
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {mensajes.map((msg: MensajeAtlas, index: number) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "border border-neutral-200 bg-neutral-50 text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                    {msg.texto}
                  </p>

                  <p
                    className={`mt-1 text-right text-[11px] ${
                      msg.role === "user" ? "text-white/70" : "text-neutral-400"
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString("es", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {cargando && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
        {errorInput && (
          <p className="mb-2 text-xs text-red-500">{errorInput}</p>
        )}

        <div className="flex items-end gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            disabled={cargando}
            placeholder="Escribe tu mensaje..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="
              max-h-[120px]
              flex-1
              resize-none
              bg-transparent
              text-sm
              outline-none
              placeholder:text-neutral-400
            "
          />

          <button
            onClick={() => enviar()}
            disabled={!isActive}
            className={`
              flex h-10 w-10 items-center justify-center rounded-xl transition
              ${
                isActive
                  ? "bg-primary text-white hover:opacity-90"
                  : "bg-neutral-200 text-neutral-400 dark:bg-neutral-700"
              }
            `}
          >
            <SendHorizonal size={18} />
          </button>
        </div>

        <p className="mt-2 hidden text-center text-xs text-neutral-400 sm:block">
          Enter para enviar · Shift + Enter para nueva línea
        </p>
      </div>
    </div>
  );
}
