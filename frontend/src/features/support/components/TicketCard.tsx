"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Ticket as ITicket } from "../types/support.types";
import { cn } from "@/lib/utils/cn";
import { Card, Status } from "@/components/ui";
import { formatDate } from "@/utils/FormatDate";
import {
  STATUS_CONFIG,
  CATEGORY_OPTIONS,
} from "../constants/support.constants";

export default function TicketCard({ ticket }: { ticket: ITicket }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[ticket.status];

  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      className="space-y-2"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
              {ticket.title}
            </p>
            <p className="text-xs text-neutral-400 mt-0.5">
              {CATEGORY_OPTIONS.find((c) => c.value === ticket.category)?.label}{" "}
              · {formatDate(ticket.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Status status={status} />
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
            <div className="space-y-1 pt-2 border-t border-neutral-100 dark:border-neutral-800">
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
