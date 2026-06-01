"use client";

import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Ticket } from "lucide-react";
import { useChatFAQ } from "@/hooks/useChatFAQ";
import TicketModal from "./TicketModal";
import atlas from "../../../../public/atlas.png";

export default function ChatFAQ() {
  const {
    abierto,
    mensajes,
    cargando,
    bottomRef,
    toggleChat,
    seleccionarOpcion,
  } = useChatFAQ();

  const [ticketAbierto, setTicketAbierto] = useState(false);

  return (
    <>
      <div
        className={`
          fixed bottom-[68px] right-4 z-50
          w-[340px] flex flex-col
          rounded-2xl
          shadow-[var(--atlas-shadow-lg)]
          transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          overflow-hidden
          ${
            abierto
              ? "h-[460px] opacity-100 translate-y-0 pointer-events-auto"
              : "h-0 opacity-0 translate-y-3 pointer-events-none"
          }
        `}
        style={{
          background: "var(--atlas-bg)",
          backdropFilter: "var(--atlas-blur)",
          WebkitBackdropFilter: "var(--atlas-blur)",
          border: "1px solid var(--atlas-border)",
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center gap-3 px-4 py-3 shrink-0"
          style={{
            background: "var(--atlas-surface)",
            backdropFilter: "var(--atlas-blur-sm)",
            WebkitBackdropFilter: "var(--atlas-blur-sm)",
            borderBottom: "1px solid var(--atlas-divider)",
          }}
        >
          <div
            className="w-9 h-9 rounded-full p-[2px] shrink-0"
            style={{
              background: "linear-gradient(135deg, var(--atlas-accent), var(--color-primary-300, #ee68a4))",
              boxShadow: "0 0 0 2px var(--atlas-bg), var(--atlas-shadow-sm)",
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image src={atlas} alt="Atlas" width={32} height={32} className="object-cover w-full h-full" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-tight tracking-[-0.01em]" style={{ color: "var(--atlas-text-primary)" }}>
              Atlas
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--atlas-online)", boxShadow: "0 0 4px var(--atlas-online)" }} />
              <span className="text-[11px] tracking-[0.01em]" style={{ color: "var(--atlas-text-muted)" }}>
                Asistente de Rumbo
              </span>
            </div>
          </div>

          <button
            onClick={toggleChat}
            aria-label="Minimizar chat"
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
            style={{ background: "var(--atlas-accent-soft)", color: "var(--atlas-accent)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--atlas-accent)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--atlas-accent-soft)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--atlas-accent)";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Mensajes ── */}
        <div className="
          flex-1 overflow-y-auto px-3.5 py-4 flex flex-col gap-3
          scroll-smooth
          [&::-webkit-scrollbar]:w-[4px]
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-[var(--atlas-border-strong)]
        ">
          {mensajes.map((m, i) => (
            <div key={i} className="flex flex-col gap-2 animate-atlas-fade-up">
              <div className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {m.role === "bot" && (
                  <div
                    className="w-7 h-7 rounded-full overflow-hidden shrink-0 mb-0.5"
                    style={{
                      border: "1.5px solid var(--atlas-border-strong)",
                      background: "var(--atlas-surface)",
                      boxShadow: "var(--atlas-shadow-sm)",
                    }}
                  >
                    <Image src={atlas} alt="Atlas" width={28} height={28} className="object-cover w-full h-full" />
                  </div>
                )}

                <div
                  className="px-3.5 py-2.5 text-sm leading-relaxed max-w-[78%]"
                  style={
                    m.role === "user"
                      ? {
                          background: "var(--atlas-bubble-user-bg)",
                          color: "var(--atlas-bubble-user-text)",
                          border: "1px solid var(--atlas-bubble-user-border)",
                          borderRadius: "18px 18px 4px 18px",
                          boxShadow: "var(--atlas-shadow-send)",
                        }
                      : {
                          background: "var(--atlas-bubble-bot-bg)",
                          color: "var(--atlas-bubble-bot-text)",
                          border: "1px solid var(--atlas-bubble-bot-border)",
                          borderRadius: "18px 18px 18px 4px",
                          backdropFilter: "var(--atlas-blur-sm)",
                          WebkitBackdropFilter: "var(--atlas-blur-sm)",
                          boxShadow: "var(--atlas-shadow-sm)",
                        }
                  }
                >
                  {m.texto}
                </div>
              </div>

              {/* Opciones del bot + botón de ticket fijo al final */}
              {m.role === "bot" && m.opciones && m.opciones.length > 0 && (
                <div className="flex flex-col gap-1.5 ml-9">
                  {m.opciones.map((op) => (
                    <button
                      key={op.id}
                      onClick={() => seleccionarOpcion(op)}
                      disabled={cargando}
                      className="
                        rounded-full px-3.5 py-1.5 text-xs font-medium text-left
                        transition-all duration-150
                        disabled:opacity-50 disabled:cursor-not-allowed
                        hover:-translate-y-px active:scale-[0.97] cursor-pointer
                      "
                      style={{
                        background: "var(--atlas-chip-bg)",
                        border: "1px solid var(--atlas-chip-border)",
                        color: "var(--atlas-chip-text)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = "var(--atlas-accent)";
                        el.style.color = "#fff";
                        el.style.borderColor = "var(--atlas-accent)";
                        el.style.boxShadow = "var(--atlas-shadow-send)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = "var(--atlas-chip-bg)";
                        el.style.color = "var(--atlas-chip-text)";
                        el.style.borderColor = "var(--atlas-chip-border)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      {op.label}
                    </button>
                  ))}

                  {/* Botón de ticket — solo en el último mensaje del bot */}
                  {i === mensajes.length - 1 && (
                    <button
                      onClick={() => setTicketAbierto(true)}
                      disabled={cargando}
                      className="
                        flex items-center gap-2
                        rounded-full px-3.5 py-1.5 text-xs font-medium text-left
                        transition-all duration-150
                        disabled:opacity-50 disabled:cursor-not-allowed
                        hover:-translate-y-px active:scale-[0.97] cursor-pointer
                      "
                      style={{
                        background: "var(--atlas-chip-bg)",
                        border: "1px solid var(--atlas-chip-border)",
                        color: "var(--atlas-chip-text)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = "var(--atlas-accent)";
                        el.style.color = "#fff";
                        el.style.borderColor = "var(--atlas-accent)";
                        el.style.boxShadow = "var(--atlas-shadow-send)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = "var(--atlas-chip-bg)";
                        el.style.color = "var(--atlas-chip-text)";
                        el.style.borderColor = "var(--atlas-chip-border)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      <Ticket size={12} />
                      Abrir ticket de soporte
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Indicador de carga */}
          {cargando && (
            <div className="flex items-end gap-2 animate-atlas-fade-up">
              <div
                className="w-7 h-7 rounded-full overflow-hidden shrink-0"
                style={{
                  border: "1.5px solid var(--atlas-border-strong)",
                  background: "var(--atlas-surface)",
                  boxShadow: "var(--atlas-shadow-sm)",
                }}
              >
                <Image src={atlas} alt="Atlas" width={28} height={28} className="object-cover w-full h-full" />
              </div>
              <div
                className="px-4 py-3 flex items-center gap-[5px]"
                style={{
                  background: "var(--atlas-bubble-bot-bg)",
                  border: "1px solid var(--atlas-bubble-bot-border)",
                  borderRadius: "18px 18px 18px 4px",
                  boxShadow: "var(--atlas-shadow-sm)",
                }}
              >
                <span className="w-[7px] h-[7px] rounded-full animate-chat-bounce" style={{ background: "var(--atlas-text-muted)" }} />
                <span className="w-[7px] h-[7px] rounded-full animate-chat-bounce-delay-1" style={{ background: "var(--atlas-text-muted)" }} />
                <span className="w-[7px] h-[7px] rounded-full animate-chat-bounce-delay-2" style={{ background: "var(--atlas-text-muted)" }} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Modal renderizado fuera del chat via portal ── */}
      {ticketAbierto && typeof document !== "undefined" &&
        createPortal(
          <TicketModal onClose={() => setTicketAbierto(false)} />,
          document.body
        )
      }

      {/* ── Barra inferior ── */}
      <div
        onClick={toggleChat}
        className="
          fixed bottom-4 right-4 z-50
          w-[340px] flex items-center gap-3
          px-4 py-3 rounded-2xl
          cursor-pointer select-none
          transition-all duration-200
          hover:scale-[1.015] hover:-translate-y-px active:scale-[0.99]
        "
        style={{
          background: "var(--atlas-surface)",
          backdropFilter: "var(--atlas-blur-sm)",
          WebkitBackdropFilter: "var(--atlas-blur-sm)",
          border: "1px solid var(--atlas-border-strong)",
          boxShadow: "var(--atlas-shadow-md)",
        }}
      >
        <div
          className="w-9 h-9 rounded-full p-[2px] shrink-0"
          style={{
            background: "linear-gradient(135deg, var(--atlas-accent), var(--color-primary-300, #ee68a4))",
            boxShadow: "var(--atlas-shadow-sm)",
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            <Image src={atlas} alt="Atlas" width={32} height={32} className="object-cover w-full h-full" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight" style={{ color: "var(--atlas-text-primary)" }}>
            Atlas
          </p>
          <p className="text-[11px] truncate mt-0.5" style={{ color: "var(--atlas-text-muted)" }}>
            {abierto ? "Minimizar chat" : "¿En qué te puedo ayudar?"}
          </p>
        </div>

        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${abierto ? "rotate-180" : "rotate-0"}`}
          style={{ background: "var(--atlas-accent-soft)", color: "var(--atlas-accent)" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4.5L6 8l4-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </>
  );
}