"use client";

import {
  Forum,
  ForumRequest,
  forumService,
} from "@/features/forums/services/forumService";
import { cn } from "@/lib";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ForumCard from "./ForumCard";
import ForumRequestCard from "./ForumRequestCard";

export default function AdminForumsPage() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [requests, setRequests] = useState<ForumRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [forumsData, requestsData] = await Promise.all([
        forumService.getForums(),
        forumService.adminGetRequests(filter),
      ]);
      setForums(forumsData);
      setRequests(requestsData);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleResolve = async (id: string, action: "APPROVED" | "REJECTED") => {
    setUpdatingId(id);
    try {
      await forumService.adminResolveRequest(id, action);
      await fetchData();
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggle = async (forumId: string) => {
    setUpdatingId(forumId);
    try {
      await forumService.adminToggleForum(forumId);
      setForums((prev) =>
        prev.map((f) =>
          f.id === forumId ? { ...f, isActive: !f.isActive } : f,
        ),
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Foros
        </h1>
        <p className="text-sm text-neutral-400 mt-0.5">
          Gestiona foros y solicitudes
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
            Solicitudes
          </h2>
          <div className="flex gap-2">
            {[undefined, "PENDING", "APPROVED", "REJECTED"].map((s) => (
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
                  ? "Todas"
                  : s === "PENDING"
                    ? "Pendientes"
                    : s === "APPROVED"
                      ? "Aprobadas"
                      : "Rechazadas"}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-10 gap-3">
            <Loader2 size={20} className="animate-spin text-primary" />
            <span className="text-sm text-neutral-400">Cargando...</span>
          </div>
        ) : requests.length === 0 ? (
          <p className="text-sm text-neutral-400 text-center py-6">
            Sin solicitudes
          </p>
        ) : (
          <div className="space-y-3">
            {requests.map((r) => (
              <ForumRequestCard
                key={r.id}
                request={r}
                onResolve={handleResolve}
                isUpdating={updatingId === r.id}
              />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
          Foros
        </h2>
        {forums.length === 0 ? (
          <p className="text-sm text-neutral-400 text-center py-6">
            Sin foros creados
          </p>
        ) : (
          <div className="space-y-3">
            {forums.map((f) => (
              <ForumCard
                key={f.id}
                forum={f}
                onToggle={handleToggle}
                isUpdating={updatingId === f.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
