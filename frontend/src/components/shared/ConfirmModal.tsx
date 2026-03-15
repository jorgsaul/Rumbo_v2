"use client";

import { useConfirmation } from "@/context/ConfirmationContext";
import { cn } from "@/lib";
import Button from "@/components/ui/Button";
import { AlertTriangle, Info, CheckCircle, XCircle, X } from "lucide-react";

const CATEGORY_CONFIG = {
  danger: { icon: XCircle, color: "text-danger" },
  warning: { icon: AlertTriangle, color: "text-warning" },
  info: { icon: Info, color: "text-info" },
  success: { icon: CheckCircle, color: "text-success" },
} as const;

export default function ConfirmModal() {
  const { confirmation, resolve } = useConfirmation();

  if (!confirmation) return null;

  const { icon: Icon, color } = CATEGORY_CONFIG[confirmation.category];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => resolve(false)}
      />
      <div className="relative w-full max-w-sm bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 space-y-4">
        <button
          onClick={() => resolve(false)}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center text-center gap-3 pt-2">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center",
              confirmation.category === "danger" && "bg-danger/10",
              confirmation.category === "warning" && "bg-warning/10",
              confirmation.category === "info" && "bg-info/10",
              confirmation.category === "success" && "bg-success/10",
            )}
          >
            <Icon size={26} className={color} />
          </div>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
            {confirmation.title}
          </h2>
        </div>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed text-center">
          {confirmation.description}
        </p>

        <div className="flex items-center justify-center gap-2 pt-1">
          <Button variant="ghost" size="sm" onClick={() => resolve(false)}>
            Cancelar
          </Button>
          <Button
            variant={confirmation.category === "danger" ? "danger" : "primary"}
            size="sm"
            onClick={() => resolve(true)}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
