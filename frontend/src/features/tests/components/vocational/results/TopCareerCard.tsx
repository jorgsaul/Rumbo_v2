"use client";

import { cn } from "@/lib/utils/cn";
import { Tag } from "@/components/ui/Tag";
import type {
  CareerResult,
  IkigaiZone,
} from "@/features/tests/types/tests.types";

const ZONA_CONFIG: Record<
  IkigaiZone,
  { label: string; variant: "success" | "info" | "neutral" }
> = {
  PROPOSITO_FUERTE: { label: "Propósito fuerte", variant: "success" },
  PROFESION_IDEAL: { label: "Profesión ideal", variant: "info" },
  EXPLORAR_MAS: { label: "Explorar más", variant: "neutral" },
};

const RANK_COLORS = [
  "text-warning-700 bg-warning/10",
  "text-neutral-400 bg-neutral-100 dark:bg-neutral-800",
  "text-warning-600 bg-warning/10",
];

interface TopCareersCardProps {
  career: CareerResult;
  ranking: number;
}

export default function TopCareersCard({
  career,
  ranking,
}: TopCareersCardProps) {
  const zona = ZONA_CONFIG[career.zonaIkigai];
  const rankColor =
    RANK_COLORS[ranking - 1] ??
    "text-neutral-400 bg-neutral-100 dark:bg-neutral-800";

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-primary/30 transition-colors">
      <div
        className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0",
          rankColor,
        )}
      >
        #{ranking}
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 leading-tight">
            {career.name}
          </p>
          <Tag label={zona.label} variant={zona.variant} />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400">Compatibilidad</span>
            <span className="text-xs font-bold text-primary">
              {career.compatibility}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${career.compatibility}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {(Object.entries(career.scores) as [string, number][]).map(
            ([pilar, score]) => (
              <div key={pilar} className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 capitalize">
                  {pilar}
                </span>
                <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                  {score}%
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
