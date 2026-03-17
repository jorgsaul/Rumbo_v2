"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { forumService } from "../services/forumService";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";

export default function ForumRequestPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { addToast } = useToast();

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await forumService.createRequest({
        name,
        description: description.trim() || undefined,
      });
      addToast({
        title: "Solicitud enviada",
        description: "El equipo revisará tu solicitud pronto",
        category: "success",
      });
      router.push("/foros");
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Error enviando solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-neutral-900 dark:text-white">
            Solicitar foro
          </h1>
          <p className="text-xs text-neutral-400">
            El equipo revisará tu solicitud antes de crear el foro
          </p>
        </div>
      </div>

      <Card
        padding="md"
        rounded="xl"
        border="light"
        shadow="sm"
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Nombre del foro <span className="text-danger">*</span>
          </p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Ingeniería Civil"
            maxLength={50}
            className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors"
          />
          <p className="text-xs text-neutral-400 text-right">
            {name.length}/50
          </p>
        </div>

        <div className="space-y-1.5">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Descripción <span className="text-neutral-400">(opcional)</span>
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="¿De qué tratará este foro?"
            rows={3}
            maxLength={200}
            className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors resize-none"
          />
          <p className="text-xs text-neutral-400 text-right">
            {description.length}/200
          </p>
        </div>

        {error && <p className="text-xs text-danger">{error}</p>}

        <Button
          variant="primary"
          fullWidth
          onClick={handleSubmit}
          loading={isLoading}
          disabled={!name.trim()}
        >
          Enviar solicitud
        </Button>
      </Card>

      <div className="p-4 rounded-xl bg-info/5 border border-info/20 space-y-1">
        <p className="text-xs font-medium text-info">¿Cómo funciona?</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Tu solicitud será revisada por el equipo. Si es aprobada, el foro
          aparecerá disponible para toda la comunidad. Solo se aprueba un foro
          por tema.
        </p>
      </div>
    </div>
  );
}
