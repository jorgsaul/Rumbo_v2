"use client";

import { useEffect, useState } from "react";
import { FlaskConical, BookOpen, Trophy, Clock, Share2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils/cn";
import Card from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import RadarChart from "@/features/tests/components/vocational/results/RadarChart";
import { getUserResults } from "@/features/tests/services/testService";
import { formatDate } from "@/utils/FormatDate";
import { useRouter } from "next/navigation";
import type {
  TestResult,
  VocalTestResult,
  KnowledgeTestResult,
  IkigaiZone,
} from "@/features/tests/types/tests.types";
import { IconButton } from "@/components/ui";

const isVocational = (r: TestResult): r is VocalTestResult => "zonaIkigai" in r;

const ZONA_LABEL: Record<
  IkigaiZone,
  { label: string; variant: "success" | "info" | "neutral" }
> = {
  PROPOSITO_FUERTE: { label: "Propósito fuerte", variant: "success" },
  PROFESION_IDEAL: { label: "Profesión ideal", variant: "info" },
  EXPLORAR_MAS: { label: "Explorar más", variant: "neutral" },
};

const getScoreVariant = (
  score: number,
): "success" | "info" | "warning" | "danger" => {
  if (score >= 80) return "success";
  if (score >= 60) return "info";
  if (score >= 40) return "warning";
  return "danger";
};

function VocalResultCard({ result }: { result: VocalTestResult }) {
  const { addToast } = useToast();

  const handleShare = () => {
    const url = `${window.location.origin}/resultados/${result.id}`;
    navigator.clipboard.writeText(url);
    addToast({
      title: "Link copiado",
      description: "Comparte tu resultado con quien quieras",
      category: "success",
    });
  };

  const zona = ZONA_LABEL[result.zonaIkigai];
  const profile = {
    tecnologico: result.perfilTecnologico,
    cientifico: result.perfilCientifico,
    salud: result.perfilSalud,
    administrativo: result.perfilAdministrativo,
    social: result.perfilSocial,
  };
  const router = useRouter();

  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      className="space-y-4 cursor-pointer"
      onClick={() => router.push(`/resultados/${result.id}`)}
      clickable="lift"
    >
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <FlaskConical size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
              Test Vocacional
            </p>
            <p className="text-xs text-neutral-400 flex items-center gap-1">
              <Clock size={11} />
              {formatDate(result.createdAt)}
            </p>
          </div>
        </div>
        <Tag label={zona.label} variant={zona.variant} />
      </div>

      <div className="flex items-center gap-2">
        <Tag label={zona.label} variant={zona.variant} />
        <div onClick={(e) => e.stopPropagation()}>
          <IconButton
            icon={Share2}
            label="Compartir resultado"
            onClick={handleShare}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-black text-primary">
          {Math.round(result.scoreGlobal)}%
        </span>
        <span className="text-xs text-neutral-400">Score Ikigai</span>
      </div>

      <RadarChart profile={profile} />

      {result.topCarreras[0] && (
        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs text-neutral-400 mb-0.5">Top carrera</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
              {result.topCarreras[0].name}
            </p>
            <span className="text-xs font-bold text-primary">
              {result.topCarreras[0].compatibility}%
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}

function KnowledgeResultCard({ result }: { result: KnowledgeTestResult }) {
  const variant = getScoreVariant(result.score);

  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      className="space-y-3"
    >
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-info/10 flex items-center justify-center">
            <BookOpen size={18} className="text-info" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
              Test de Conocimientos
            </p>
            <p className="text-xs text-neutral-400 flex items-center gap-1">
              <Clock size={11} />
              {formatDate(result.createdAt)}
            </p>
          </div>
        </div>
        <Tag label={`${Math.round(result.score)}%`} variant={variant} />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Score",
            value: `${Math.round(result.score)}%`,
            color: cn("font-bold", {
              "text-success": variant === "success",
              "text-info": variant === "info",
              "text-warning-700": variant === "warning",
              "text-danger": variant === "danger",
            }),
          },
          {
            label: "Correctas",
            value: result.correctAnswers,
            color: "text-success font-bold",
          },
          {
            label: "Total",
            value: result.totalQuestions,
            color: "text-neutral-600 dark:text-neutral-400 font-semibold",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900"
          >
            <p className={cn("text-lg", stat.color)}>{stat.value}</p>
            <p className="text-xs text-neutral-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", {
            "bg-success": variant === "success",
            "bg-info": variant === "info",
            "bg-warning": variant === "warning",
            "bg-danger": variant === "danger",
          })}
          style={{ width: `${result.score}%` }}
        />
      </div>
    </Card>
  );
}

interface ProfileResultsProps {
  userId: string;
}

export function ProfileResults({ userId }: ProfileResultsProps) {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getUserResults(userId);
        setResults(data);
      } catch {
        setError("No se pudieron cargar los resultados");
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <Card key={i} padding="md" rounded="xl" border="light" shadow="sm">
            <div className="animate-pulse space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3.5 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4" />
                </div>
              </div>
              <div className="h-40 bg-neutral-100 dark:bg-neutral-800 rounded-xl" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-danger text-center py-8">{error}</p>;
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Trophy size={24} className="text-primary" />
        </div>
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Aún no tienes resultados
        </p>
        <p className="text-xs text-neutral-400 max-w-xs">
          Completa un test vocacional o de conocimientos para ver tus resultados
          aquí
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) =>
        isVocational(result) ? (
          <VocalResultCard key={result.id} result={result} />
        ) : (
          <KnowledgeResultCard
            key={result.id}
            result={result as KnowledgeTestResult}
          />
        ),
      )}
    </div>
  );
}
