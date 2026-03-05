"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  AlertCircle,
  Clock,
  CheckCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { adminService } from "../services/adminService";
import { Ticket } from "@/features/support/types/support.types";
import { cn } from "@/lib/utils/cn";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatDate } from "@/utils/FormatDate";

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

const CATEGORY_LABELS: Record<string, string> = {
  BUG: "Error",
  QUESTION: "Pregunta",
  SUGGESTION: "Sugerencia",
  OTHER: "Otro",
};

function TicketAdminCard({
  ticket,
  onUpdate,
  isUpdating,
}: {
  ticket: Ticket;
  onUpdate: (
    ticketId: string,
    data: { status?: string; adminReply?: string },
  ) => void;
  isUpdating: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [reply, setReply] = useState(ticket.adminReply ?? "");
  const status = STATUS_CONFIG[ticket.status];
  const Icon = status.icon;

  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      className="space-y-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {ticket.user?.avatarUrl ? (
            <Image
              src={ticket.user.avatarUrl}
              alt=""
              width={28}
              height={28}
              className="rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary">
                {ticket.user?.username.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
              {ticket.title}
            </p>
            <p className="text-xs text-neutral-400">
              @{ticket.user?.username} · {CATEGORY_LABELS[ticket.category]} ·{" "}
              {formatDate(ticket.createdAt)}
            </p>
          </div>
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
            className="text-neutral-300 hover:text-neutral-500"
          >
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="space-y-3 pt-1">
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {ticket.description}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Estado:</span>
            <select
              value={ticket.status}
              onChange={(e) => onUpdate(ticket.id, { status: e.target.value })}
              disabled={isUpdating}
              className="text-xs px-2 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 outline-none focus:border-primary"
            >
              <option value="OPEN">Abierto</option>
              <option value="IN_REVIEW">En revisión</option>
              <option value="RESOLVED">Resuelto</option>
            </select>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-neutral-400">Respuesta al usuario</p>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Escribe una respuesta..."
              rows={3}
              className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary resize-none"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={() => onUpdate(ticket.id, { adminReply: reply })}
              loading={isUpdating}
            >
              Guardar respuesta
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getTickets(filter);
      setTickets(data);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleUpdate = async (
    ticketId: string,
    data: { status?: string; adminReply?: string },
  ) => {
    setUpdatingId(ticketId);
    try {
      await adminService.updateTicket(ticketId, data);
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId ? ({ ...t, ...data } as Ticket) : t,
        ),
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Soporte
        </h1>
        <p className="text-sm text-neutral-400 mt-0.5">
          Gestiona los tickets de usuarios
        </p>
      </div>

      <div className="flex gap-2">
        {[undefined, "OPEN", "IN_REVIEW", "RESOLVED"].map((s) => (
          <button
            key={s ?? "all"}
            onClick={() => setFilter(s)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-full border transition-colors",
              filter === s
                ? "bg-primary text-white border-primary"
                : "border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:border-primary",
            )}
          >
            {s === undefined
              ? "Todos"
              : s === "OPEN"
                ? "Abiertos"
                : s === "IN_REVIEW"
                  ? "En revisión"
                  : "Resueltos"}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16 gap-3">
          <Loader2 size={20} className="animate-spin text-primary" />
          <span className="text-sm text-neutral-400">Cargando...</span>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-neutral-400">{tickets.length} tickets</p>
          {tickets.map((t) => (
            <TicketAdminCard
              key={t.id}
              ticket={t}
              onUpdate={handleUpdate}
              isUpdating={updatingId === t.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
