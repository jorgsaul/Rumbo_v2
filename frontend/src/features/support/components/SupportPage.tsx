"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Ticket,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { ticketService } from "../services/ticketService";
import { Ticket as ITicket } from "../types/support.types";
import { cn } from "@/lib/utils/cn";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatDate } from "@/utils/FormatDate";

const CATEGORY_OPTIONS = [
  { value: "BUG", label: "Reporte de error" },
  { value: "QUESTION", label: "Pregunta" },
  { value: "SUGGESTION", label: "Sugerencia" },
  { value: "OTHER", label: "Otro" },
];

const STATUS_CONFIG = {
  OPEN: {
    label: "Abierto",
    color: "bg-warning/10 text-warning",
    icon: AlertCircle,
  },
  IN_REVIEW: {
    label: "En revisión",
    color: "bg-info/10 text-info",
    icon: Clock,
  },
  RESOLVED: {
    label: "Resuelto",
    color: "bg-success/10 text-success",
    icon: CheckCircle,
  },
};

function TicketCard({ ticket }: { ticket: ITicket }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[ticket.status];
  const Icon = status.icon;

  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      className="space-y-2"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
            {ticket.title}
          </p>
          <p className="text-xs text-neutral-400 mt-0.5">
            {CATEGORY_OPTIONS.find((c) => c.value === ticket.category)?.label} ·{" "}
            {formatDate(ticket.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1",
              status.color,
            )}
          >
            <Icon size={11} />
            {status.label}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-neutral-300 hover:text-neutral-500 transition-colors"
          >
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="space-y-2 pt-1">
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {ticket.description}
          </p>
          {ticket.adminReply && (
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 space-y-1">
              <p className="text-xs font-medium text-primary">
                Respuesta del equipo
              </p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {ticket.adminReply}
              </p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function NewTicketForm({ onCreated }: { onCreated: (t: ITicket) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("OTHER");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Completa todos los campos");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const ticket = await ticketService.create({
        title,
        description,
        category,
      });
      onCreated(ticket);
      setTitle("");
      setDescription("");
      setCategory("OTHER");
    } catch {
      setError("Error enviando el ticket");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      className="space-y-3"
    >
      <p className="text-sm font-semibold text-neutral-900 dark:text-white">
        Nuevo ticket
      </p>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 outline-none focus:border-primary transition-colors"
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
        placeholder="Describe tu problema o sugerencia..."
        rows={4}
        className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors resize-none"
      />

      {error && <p className="text-xs text-danger">{error}</p>}

      <Button
        variant="primary"
        size="sm"
        onClick={handleSubmit}
        loading={isLoading}
      >
        Enviar ticket
      </Button>
    </Card>
  );
}

export default function SupportPage() {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    ticketService
      .getMyTickets()
      .then(setTickets)
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreated = (ticket: ITicket) => {
    setTickets((prev) => [ticket, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Soporte
          </h1>
          <p className="text-sm text-neutral-400 mt-0.5">
            Envía dudas, reportes o sugerencias
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus size={15} />}
          onClick={() => setShowForm(!showForm)}
        >
          Nuevo ticket
        </Button>
      </div>

      {showForm && <NewTicketForm onCreated={handleCreated} />}

      {isLoading ? (
        <div className="flex items-center justify-center py-16 gap-3">
          <Loader2 size={20} className="animate-spin text-primary" />
          <span className="text-sm text-neutral-400">Cargando...</span>
        </div>
      ) : tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Ticket size={24} className="text-primary" />
          </div>
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Sin tickets
          </p>
          <p className="text-xs text-neutral-400">
            Crea uno si tienes algún problema
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((t) => (
            <TicketCard key={t.id} ticket={t} />
          ))}
        </div>
      )}
    </div>
  );
}
