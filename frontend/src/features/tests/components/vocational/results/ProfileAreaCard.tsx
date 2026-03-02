"use client";

import { cn } from "@/lib/utils/cn";

const AREA_CONFIG = {
  tecnologico: {
    label: "Tecnológico",
    icon: "💻",
    color: "text-info",
    bg: "bg-info/10",
    bar: "bg-info",
  },
  cientifico: {
    label: "Científico",
    icon: "🔬",
    color: "text-success",
    bg: "bg-success/10",
    bar: "bg-success",
  },
  salud: {
    label: "Salud",
    icon: "🏥",
    color: "text-danger",
    bg: "bg-danger/10",
    bar: "bg-danger",
  },
  administrativo: {
    label: "Administrativo",
    icon: "📈",
    color: "text-warning-700",
    bg: "bg-warning/10",
    bar: "bg-warning",
  },
  social: {
    label: "Social",
    icon: "🤝",
    color: "text-primary",
    bg: "bg-primary/10",
    bar: "bg-primary",
  },
} as const;

interface ProfileAreaCardProps {
  area: keyof typeof AREA_CONFIG;
  value: number;
}

export default function ProfileAreaCard({ area, value }: ProfileAreaCardProps) {
  const config = AREA_CONFIG[area];

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center text-lg",
            config.bg,
          )}
        >
          {config.icon}
        </div>
        <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          {config.label}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className={cn("text-2xl font-bold", config.color)}>
            {value}%
          </span>
        </div>
        <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-700",
              config.bar,
            )}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
}
