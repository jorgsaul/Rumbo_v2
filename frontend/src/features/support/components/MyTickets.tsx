"use client";

import { useEffect, useState } from "react";
import { Ticket as ITicket } from "../types/support.types";
import { ticketService } from "../services/ticketService";
import TicketCard from "./TicketCard";
import { TicketCheck, Loader2, Inbox } from "lucide-react";

export default function MyTickets() {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ticketService
      .getMyTickets()
      .then(setTickets)
      .catch(() => setError("No se pudieron cargar tus tickets."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-10 text-neutral-400 text-sm">
        <Loader2 size={16} className="animate-spin" />
        Cargando tickets...
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-500 text-center py-6">{error}</p>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-10 text-neutral-400">
        <Inbox size={28} strokeWidth={1.5} />
        <p className="text-sm">No tienes tickets enviados aún.</p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <TicketCheck size={16} className="text-primary" />
        <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
          Mis tickets de soporte
        </h2>
        <span className="ml-auto text-xs text-neutral-400">
          {tickets.length} {tickets.length === 1 ? "ticket" : "tickets"}
        </span>
      </div>

      <div className="space-y-3">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </section>
  );
}