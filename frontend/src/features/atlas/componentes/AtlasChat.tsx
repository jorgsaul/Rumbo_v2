"use client";

import Image from "next/image";
import { useChatAtlas } from "@/hooks/useChatAtlas";
import type { MensajeAtlas } from "../types/chat.types";
import { useEffect, useRef } from "react";

interface AtlasChatProps {
  userId: string;
}

export default function AtlasChat({ userId }: AtlasChatProps) {
  const { mensajes, input, setInput, enviar, cargando } = useChatAtlas(userId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 140) + "px";
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviar();
    }
  };

  const isActive = input.trim() && !cargando;

  return (
    <div
      className="
        atlas-noise
        relative flex flex-col h-full w-full overflow-hidden
        rounded-[var(--atlas-radius-card)]
        border border-[var(--atlas-border)]
        bg-[var(--atlas-bg)]
        [backdrop-filter:var(--atlas-blur)]
        shadow-[var(--atlas-shadow-lg)]
        transition-[background,border-color] duration-300
      "
    >
      <header
        className="
          relative z-[2] flex items-center
          px-5 py-3.5
          bg-[var(--atlas-surface)]
          [backdrop-filter:var(--atlas-blur-sm)]
        "
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="relative shrink-0">
            <div
              className="
                w-[42px] h-[42px] rounded-full p-0.5
                bg-linear-to-br from-[var(--atlas-accent)] to-[var(--color-primary-300)]
                shadow-[0_0_0_2px_var(--atlas-bg),var(--atlas-shadow-sm)]
              "
            >
              <Image
                src="/atlas.png"
                alt="Atlas"
                width={36}
                height={36}
                className="w-full h-full rounded-full object-cover block"
              />
            </div>
            <span
              className="
                absolute bottom-0.5 right-0.5
                w-[11px] h-[11px] rounded-full
                bg-[var(--atlas-online)]
                border-2 border-[var(--atlas-bg)]
                shadow-[0_0_6px_var(--atlas-online)]
              "
            />
          </div>

          <div>
            <p className="text-[15px] font-semibold leading-tight tracking-[-0.01em] text-[var(--atlas-text-primary)]">
              Atlas
            </p>
            <p className="text-[11.5px] tracking-[0.01em] text-[var(--atlas-text-muted)] mt-0.5">
              Tu asistente de carrera personal
            </p>
          </div>
        </div>
      </header>

      <div className="h-px shrink-0 bg-[var(--atlas-divider)]" />

      <main
        className="
          relative z-[1] flex-1 overflow-y-auto
          px-[18px] py-5 flex flex-col gap-2.5
          scroll-smooth
          [&::-webkit-scrollbar]:w-[5px]
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-[10px]
          [&::-webkit-scrollbar-thumb]:bg-[var(--atlas-border-strong)]
        "
      >
        {mensajes.length === 0 && !cargando && (
          <div className="flex flex-col items-center justify-center flex-1 text-center px-6 py-10 gap-5 animate-atlas-fade-up-slow">

            <div
              className="
                w-24 h-24 rounded-full
                bg-linear-to-br from-[var(--atlas-accent-soft)] to-[rgba(203,53,128,0.12)]
                border border-[var(--atlas-border-strong)]
                flex items-center justify-center
                shadow-[0_0_48px_var(--atlas-accent-glow)]
              "
            >
              <Image
                src="/atlas.png"
                alt="Atlas"
                width={72}
                height={72}
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bold tracking-[-0.03em] text-[var(--atlas-text-primary)]">
                Hola, soy Atlas ✦
              </p>
              <p className="text-base leading-relaxed max-w-[300px] text-[var(--atlas-text-secondary)]">
                Tu guía personal de carrera. Cuéntame cómo te sientes hoy
                o pregúntame lo que necesites.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 justify-center mt-1">
              {[
                "¿Qué carrera me recomiendas?",
                "¿Cómo interpreto mis resultados?",
                "Necesito orientación",
              ].map((s) => (
                <button
                  key={s}
                  disabled={cargando}
                  onClick={() => enviar(s)}  
                  className="
                    px-4 py-2 whitespace-nowrap cursor-pointer
                    rounded-[var(--atlas-radius-chip)]
                    bg-[var(--atlas-chip-bg)]
                    border border-[var(--atlas-chip-border)]
                    text-[13px] font-medium text-[var(--atlas-chip-text)]
                    transition-all duration-[180ms]
                    hover:bg-[var(--atlas-accent)] hover:border-[var(--atlas-accent)]
                    hover:text-white hover:-translate-y-px
                    hover:shadow-[var(--atlas-shadow-send)]
                    active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {mensajes.map((msg: MensajeAtlas, i: number) => (
          <div
            key={i}
            className={`
              flex items-end gap-2 animate-atlas-fade-up
              ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}
            `}
          >
            {msg.role === "bot" && (
              <div
                className="
                  w-[30px] h-[30px] rounded-full overflow-hidden shrink-0 mb-0.5
                  border border-[var(--atlas-border-strong)]
                  bg-[var(--atlas-surface)]
                  shadow-[var(--atlas-shadow-sm)]
                "
              >
                <Image
                  src="/atlas.png"
                  alt="Atlas"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div
              className={`
                max-w-[min(72%,480px)] px-4 py-[11px]
                rounded-[var(--atlas-radius-bubble)]
                relative transition-shadow duration-200
                ${
                  msg.role === "user"
                    ? `
                      bg-[var(--atlas-bubble-user-bg)]
                      text-[var(--atlas-bubble-user-text)]
                      border border-[var(--atlas-bubble-user-border)]
                      rounded-br-[6px]
                      shadow-[var(--atlas-shadow-send)]
                    `
                    : `
                      bg-[var(--atlas-bubble-bot-bg)]
                      text-[var(--atlas-bubble-bot-text)]
                      border border-[var(--atlas-bubble-bot-border)]
                      [backdrop-filter:var(--atlas-blur-sm)]
                      rounded-bl-[6px]
                      shadow-[var(--atlas-shadow-sm)]
                    `
                }
              `}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                {msg.texto}
              </p>
              <span className="block text-[10px] mt-1 opacity-55 text-right tracking-[0.02em]">
                {new Date().toLocaleTimeString("es", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}

        {cargando && (
          <div className="flex items-end gap-2 flex-row animate-atlas-fade-up">
            <div
              className="
                w-[30px] h-[30px] rounded-full overflow-hidden shrink-0 mb-0.5
                border border-[var(--atlas-border-strong)]
                bg-[var(--atlas-surface)]
                shadow-[var(--atlas-shadow-sm)]
              "
            >
              <Image
                src="/atlas.png"
                alt="Atlas"
                width={28}
                height={28}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="
                px-[18px] py-3.5 flex items-center gap-[5px] min-w-[58px]
                rounded-[var(--atlas-radius-bubble)] rounded-bl-[6px]
                bg-[var(--atlas-bubble-bot-bg)]
                border border-[var(--atlas-bubble-bot-border)]
                [backdrop-filter:var(--atlas-blur-sm)]
                shadow-[var(--atlas-shadow-sm)]
              "
            >
              <span className="w-[7px] h-[7px] rounded-full bg-[var(--atlas-text-muted)] animate-chat-bounce" />
              <span className="w-[7px] h-[7px] rounded-full bg-[var(--atlas-text-muted)] animate-chat-bounce-delay-1" />
              <span className="w-[7px] h-[7px] rounded-full bg-[var(--atlas-text-muted)] animate-chat-bounce-delay-2" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      <div className="h-px shrink-0 bg-[var(--atlas-divider)]" />

      <footer
        className="
          relative z-[2] px-[18px] pt-3.5 pb-4
          bg-[var(--atlas-surface)]
          [backdrop-filter:var(--atlas-blur-sm)]
        "
      >
        <div
          className="
            flex items-end gap-2.5
            bg-[var(--atlas-input-bg)]
            [backdrop-filter:var(--atlas-blur-sm)]
            border border-[var(--atlas-input-border)]
            rounded-[var(--atlas-radius-input)]
            pl-4 pr-2.5 py-2.5
            shadow-[var(--atlas-shadow-sm)]
            transition-[border-color,box-shadow] duration-200
            focus-within:border-[var(--atlas-input-focus)]
            focus-within:shadow-[0_0_0_3px_var(--atlas-accent-glow),var(--atlas-shadow-sm)]
          "
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escríbele a Atlas..."
            rows={1}
            disabled={cargando}
            className="
              flex-1 resize-none border-none outline-none bg-transparent
              text-sm leading-relaxed
              text-[var(--atlas-text-primary)]
              placeholder:text-[var(--atlas-text-muted)]
              max-h-[140px] overflow-y-auto
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              disabled:opacity-60
            "
          />

          <button
            onClick={() => enviar()}
            disabled={!isActive}
            aria-label="Enviar mensaje"
            className={`
              w-[38px] h-[38px] rounded-xl shrink-0
              flex items-center justify-center
              border-none outline-none
              transition-all duration-200
              ${
                isActive
                  ? `
                    bg-[var(--atlas-accent)] text-white cursor-pointer
                    shadow-[var(--atlas-shadow-send)]
                    hover:bg-[var(--atlas-accent-hover)]
                    hover:scale-[1.06] hover:-translate-y-px
                    active:scale-95
                    [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]
                  `
                  : `
                    bg-[var(--atlas-border)] text-[var(--atlas-text-muted)]
                    cursor-not-allowed
                  `
              }
            `}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <p className="hidden sm:block text-[11px] text-center mt-2 tracking-[0.01em] text-[var(--atlas-text-muted)]">
          <kbd className="inline-block px-[5px] py-px rounded bg-[var(--atlas-border)] border border-[var(--atlas-border-strong)] font-[inherit] text-[10.5px] text-[var(--atlas-text-secondary)]">
            ↵ Enter
          </kbd>{" "}
          para enviar ·{" "}
          <kbd className="inline-block px-[5px] py-px rounded bg-[var(--atlas-border)] border border-[var(--atlas-border-strong)] font-[inherit] text-[10.5px] text-[var(--atlas-text-secondary)]">
            ⇧ Shift + Enter
          </kbd>{" "}
          para nueva línea
        </p>
      </footer>
    </div>
  );
}