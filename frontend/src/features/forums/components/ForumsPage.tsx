"use client";

import { useState, useEffect } from "react";
import { forumService, Forum } from "../services/forumService";
import { useRouter } from "next/navigation";
import { Loader2, Plus, MessageSquare } from "lucide-react";
import Button from "@/components/ui/Button";
import ForumCard from "./ForumCard";

export default function ForumsPage() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    forumService
      .getForums()
      .then(setForums)
      .catch(() => setError("Error cargando foros"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Foros
          </h1>
          <p className="text-sm text-neutral-400 mt-0.5">
            Espacios de discusión por tema
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus size={15} />}
          onClick={() => router.push("/foros/solicitar")}
        >
          Solicitar foro
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16 gap-3">
          <Loader2 size={20} className="animate-spin text-primary" />
          <span className="text-sm text-neutral-400">Cargando...</span>
        </div>
      ) : error ? (
        <p className="text-sm text-danger text-center py-8">{error}</p>
      ) : forums.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <MessageSquare size={24} className="text-primary" />
          </div>
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            No hay foros disponibles
          </p>
          <p className="text-xs text-neutral-400">
            Sé el primero en solicitar uno
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {forums.map((forum) => (
            <ForumCard key={forum.id} forum={forum} />
          ))}
        </div>
      )}
    </div>
  );
}
