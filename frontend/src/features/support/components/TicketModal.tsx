"use client";
import { useState } from "react";
import { X, Ticket } from "lucide-react";
import { ticketService } from "../services/ticketService";
import { CATEGORY_OPTIONS } from "../constants/support.constants";
import { Ticket as ITicket } from "../types/support.types";

interface TicketModalProps {
  onClose: () => void;
  onCreated?: (t: ITicket) => void;
}

export default function TicketModal({ onClose, onCreated }: TicketModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("OTHER");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Completa todos los campos");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const ticket = await ticketService.create({ title, description, category });
      onCreated?.(ticket);
      setSuccess(true);
      setTimeout(() => onClose(), 1800);
    } catch {
      setError("Error enviando el ticket. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4"
      style={{
        backdropFilter: "saturate(180%) blur(16px)",
        WebkitBackdropFilter: "saturate(180%) blur(16px)",
        background: "rgba(20, 6, 14, 0.45)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-sm animate-atlas-fade-up"
        style={{
          background: "var(--atlas-surface)",
          backdropFilter: "var(--atlas-blur)",
          WebkitBackdropFilter: "var(--atlas-blur)",
          border: "1px solid var(--atlas-border-strong)",
          borderRadius: "var(--atlas-radius-card)",
          boxShadow: "var(--atlas-shadow-lg)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid var(--atlas-divider)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "var(--atlas-accent-soft)",
                color: "var(--atlas-accent)",
              }}
            >
              <Ticket size={15} />
            </div>
            <div>
              <p
                className="text-sm font-semibold leading-tight"
                style={{ color: "var(--atlas-text-primary)" }}
              >
                Nuevo ticket
              </p>
              <p
                className="text-[11px] mt-0.5"
                style={{ color: "var(--atlas-text-muted)" }}
              >
                El equipo te responderá pronto
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
            style={{
              background: "var(--atlas-accent-soft)",
              color: "var(--atlas-accent)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--atlas-accent)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--atlas-accent-soft)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--atlas-accent)";
            }}
          >
            <X size={13} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3">
          {success ? (
            <div className="py-6 flex flex-col items-center gap-2 animate-atlas-fade-up">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ background: "rgba(71,184,129,0.12)", color: "#47b881" }}
              >
                ✓
              </div>
              <p className="text-sm font-medium mt-1" style={{ color: "var(--atlas-text-primary)" }}>
                ¡Ticket enviado!
              </p>
              <p className="text-xs text-center" style={{ color: "var(--atlas-text-muted)" }}>
                Lo revisaremos a la brevedad.
              </p>
            </div>
          ) : (
            <>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título del problema"
                className="w-full px-3.5 py-2.5 text-sm outline-none transition-all duration-150"
                style={{
                  background: "var(--atlas-input-bg)",
                  border: "1px solid var(--atlas-input-border)",
                  borderRadius: "var(--atlas-radius-input)",
                  color: "var(--atlas-text-primary)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--atlas-input-focus)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px var(--atlas-accent-soft)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--atlas-input-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm outline-none transition-all duration-150 appearance-none cursor-pointer"
                style={{
                  background: "var(--atlas-input-bg)",
                  border: "1px solid var(--atlas-input-border)",
                  borderRadius: "var(--atlas-radius-input)",
                  color: "var(--atlas-text-secondary)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--atlas-input-focus)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px var(--atlas-accent-soft)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--atlas-input-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe tu problema o sugerencia con detalle..."
                rows={4}
                className="w-full px-3.5 py-2.5 text-sm outline-none transition-all duration-150 resize-none"
                style={{
                  background: "var(--atlas-input-bg)",
                  border: "1px solid var(--atlas-input-border)",
                  borderRadius: "var(--atlas-radius-input)",
                  color: "var(--atlas-text-primary)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--atlas-input-focus)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px var(--atlas-accent-soft)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--atlas-input-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />

              {error && (
                <p className="text-xs" style={{ color: "var(--color-danger)" }}>
                  {error}
                </p>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div
            className="px-5 py-3 flex gap-2"
            style={{ borderTop: "1px solid var(--atlas-divider)" }}
          >
            <button
              onClick={onClose}
              className="flex-1 py-2 text-sm rounded-full transition-all duration-150 hover:opacity-80"
              style={{
                background: "var(--atlas-accent-soft)",
                color: "var(--atlas-accent)",
                border: "1px solid var(--atlas-chip-border)",
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: isLoading ? "var(--atlas-accent-soft)" : "var(--atlas-accent)",
                color: isLoading ? "var(--atlas-accent)" : "#fff",
                boxShadow: isLoading ? "none" : "var(--atlas-shadow-send)",
              }}
            >
              {isLoading ? "Enviando..." : "Enviar ticket"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}