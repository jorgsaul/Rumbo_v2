"use client";
import { useState } from "react";
import { Ticket as ITicket } from "../types/support.types";
import { ticketService } from "../services/ticketService";
import { Button, Card } from "@/components/ui";
import { CATEGORY_OPTIONS } from "../constants/support.constants";

export default function NewTicketForm({
  onCreated,
}: {
  onCreated: (t: ITicket) => void;
}) {
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
