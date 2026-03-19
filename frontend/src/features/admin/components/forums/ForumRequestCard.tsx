"use client";

import { Status } from "@/components/ui";
import Card from "@/components/ui/Card";
import { ForumRequest } from "@/features/forums/services/forumService";
import { cn } from "@/lib";
import { formatDate } from "@/utils/FormatDate";
import { Check, Loader2, X } from "lucide-react";

const STATUS_CONFIG = {
  APPROVED: { label: "Aprobado", color: "bg-success" },
  REJECTED: { label: "Rechazado", color: "bg-danger" },
  PENDING: { label: "Pendiente", color: "bg-warning" },
};

export default function ForumRequestCard({
  request,
  onResolve,
  isUpdating,
}: {
  request: ForumRequest;
  onResolve: (id: string, action: "APPROVED" | "REJECTED") => void;
  isUpdating: boolean;
}) {
  const status = STATUS_CONFIG[request.status];

  return (
    <Card padding="md" rounded="xl" border="light" shadow="sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {request.user?.avatarUrl ? (
            <img
              src={request.user.avatarUrl}
              className="w-7 h-7 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary">
                {request.user?.username.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
              {request.name}
            </p>
            <p className="text-xs text-neutral-400">
              @{request.user?.username} · {formatDate(request.createdAt)}
            </p>
            {request.description && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {request.description}
              </p>
            )}
          </div>
        </div>

        {request.status === "PENDING" && (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onResolve(request.id, "APPROVED")}
              disabled={isUpdating}
              className="p-1.5 rounded-lg text-success hover:bg-success/10 transition-colors"
              title="Aprobar"
            >
              {isUpdating ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Check size={15} />
              )}
            </button>
            <button
              onClick={() => onResolve(request.id, "REJECTED")}
              disabled={isUpdating}
              className="p-1.5 rounded-lg text-danger hover:bg-danger/10 transition-colors"
              title="Rechazar"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {request.status !== "PENDING" && <Status status={status} />}
      </div>
    </Card>
  );
}
