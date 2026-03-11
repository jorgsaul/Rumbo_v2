"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Ticket as ITicket } from "../types/support.types";
import { cn } from "@/lib/utils/cn";
import Card from "@/components/ui/Card";
import { formatDate } from "@/utils/FormatDate";
import {
  STATUS_CONFIG,
  CATEGORY_OPTIONS,
} from "../constants/support.constants";

export default function TicketCard({ ticket }: { ticket: ITicket }) {
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
