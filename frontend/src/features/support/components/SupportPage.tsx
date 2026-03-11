"use client";
import { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import { Ticket as ITicket } from "../types/support.types";
import { ticketService } from "../services/ticketService";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui";
import { Ticket } from "lucide-react";
import NewTicketForm from "./TicketSection";
import FAQSection from "./FAQSection";

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
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Soporte
        </h1>
        <p className="text-sm text-neutral-400 mt-0.5">
          Encuentra respuestas o contáctanos
        </p>
      </div>

      <FAQSection />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket size={18} className="text-primary" />
            <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
              ¿No encontraste tu respuesta?
            </h2>
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
          <div className="flex flex-col items-center justify-center py-10 gap-3">
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
    </div>
  );
}
