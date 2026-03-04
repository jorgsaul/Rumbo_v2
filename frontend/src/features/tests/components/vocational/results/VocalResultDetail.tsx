"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, ChevronRight } from "lucide-react";
import { getVocalResultById } from "@/features/tests/services/testService";
import { Tag } from "@/components/ui/Tag";
import Card from "@/components/ui/Card";
import RadarChart from "./RadarChart";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/utils/FormatDate";
import type {
  VocalTestResult,
  IkigaiZone,
  CareerResult,
} from "@/features/tests/types/tests.types";

const ZONA_CONFIG: Record<
  IkigaiZone,
  { label: string; variant: "success" | "info" | "neutral" }
> = {
  PROPOSITO_FUERTE: { label: "Propósito fuerte", variant: "success" },
  PROFESION_IDEAL: { label: "Profesión ideal", variant: "info" },
  EXPLORAR_MAS: { label: "Explorar más", variant: "neutral" },
};

const PILAR_CONFIG = {
  pasion: { label: "Pasión", color: "bg-danger", text: "text-danger" },
  vocacion: { label: "Vocación", color: "bg-info", text: "text-info" },
  profesion: { label: "Profesión", color: "bg-success", text: "text-success" },
  mision: { label: "Misión", color: "bg-warning", text: "text-warning" },
} as const;

const AREA_CONFIG = {
  tecnologico: { label: "Tecnológico", bar: "bg-info" },
  cientifico: { label: "Científico", bar: "bg-success" },
  salud: { label: "Salud", bar: "bg-danger" },
  administrativo: { label: "Administrativo", bar: "bg-warning" },
  social: { label: "Social", bar: "bg-primary" },
} as const;

function CareerRow({
  career,
  rank,
  onClick,
}: {
  career: CareerResult;
  rank: number;
  onClick: () => void;
}) {
  const router = useRouter();
  const zona = ZONA_CONFIG[career.zonaIkigai];

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer transition-colors group"
    >
      <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-neutral-500">#{rank}</span>
      </div>

      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">
            {career.name}
          </p>
          <span className="text-xs font-bold text-primary shrink-0">
            {career.compatibility}%
          </span>
        </div>

        <div className="w-full h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${career.compatibility}%` }}
          />
        </div>

        <div className="flex items-center gap-3">
          {(
            Object.entries(career.scores) as [
              keyof typeof PILAR_CONFIG,
              number,
            ][]
          ).map(([pilar, score]) => (
            <span
              key={pilar}
              className={cn("text-xs font-medium", PILAR_CONFIG[pilar].text)}
            >
              {PILAR_CONFIG[pilar].label[0]} {score}%
            </span>
          ))}
        </div>
      </div>

      <ChevronRight
        size={14}
        className="text-neutral-300 group-hover:text-primary transition-colors shrink-0"
      />
    </div>
  );
}

export default function VocalResultDetail({ resultId }: { resultId: string }) {
  const router = useRouter();
  const [result, setResult] = useState<VocalTestResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getVocalResultById(resultId);
        setResult(data);
      } catch {
        setError("No se pudo cargar el resultado");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [resultId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] gap-3">
        <Loader2 size={20} className="animate-spin text-primary" />
        <span className="text-sm text-neutral-400">Cargando resultado...</span>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <p className="text-sm text-neutral-400">
          {error ?? "Resultado no encontrado"}
        </p>
        <button
          onClick={() => router.back()}
          className="text-sm text-primary hover:underline"
        >
          Regresar
        </button>
      </div>
    );
  }

  const zona = ZONA_CONFIG[result.zonaIkigai];
  const profile = {
    tecnologico: result.perfilTecnologico,
    cientifico: result.perfilCientifico,
    salud: result.perfilSalud,
    administrativo: result.perfilAdministrativo,
    social: result.perfilSocial,
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-5 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-neutral-900 dark:text-white">
            Resultado vocacional
          </h1>
          <p className="text-xs text-neutral-400">
            {formatDate(result.createdAt)}
          </p>
        </div>
        <Tag label={zona.label} variant={zona.variant} />
      </div>

      <Card
        padding="md"
        rounded="2xl"
        border="light"
        shadow="sm"
        className="flex items-center justify-between"
      >
        <div>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
            Score Ikigai
          </p>
          <p className="text-5xl font-black text-primary mt-1">
            {Math.round(result.scoreGlobal)}
            <span className="text-2xl text-primary/60">%</span>
          </p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-xs text-neutral-400">Zona</p>
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
            {zona.label}
          </p>
        </div>
      </Card>

      <Card padding="md" rounded="2xl" border="light" shadow="sm">
        <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          Distribución por área
        </p>
        <RadarChart profile={profile} />
      </Card>

      <Card
        padding="md"
        rounded="xl"
        border="light"
        shadow="sm"
        className="space-y-3"
      >
        <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Perfil vocacional
        </p>
        <div className="space-y-2.5">
          {(
            Object.entries(profile) as [keyof typeof AREA_CONFIG, number][]
          ).map(([area, value]) => {
            const cfg = AREA_CONFIG[area];
            return (
              <div key={area} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">{cfg.label}</span>
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                    {value}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full", cfg.bar)}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {result.topCarreras?.length > 0 && (
        <Card
          padding="md"
          rounded="xl"
          border="light"
          shadow="sm"
          className="space-y-2"
        >
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
            Carreras recomendadas
          </p>
          {result.topCarreras.map((career, i) => (
            <CareerRow
              key={career.id}
              career={career}
              rank={i + 1}
              onClick={() => router.push(`/carreras/${career.id}`)}
            />
          ))}
        </Card>
      )}
    </div>
  );
}
