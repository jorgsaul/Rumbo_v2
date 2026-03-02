"use client";

import { RotateCcw, User } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import ProfileAreaCard from "./ProfileAreaCard";
import TopCareersCard from "./TopCareerCard";
import RadarChart from "./RadarChart";
import type {
  VocalTestResult,
  IkigaiZone,
} from "@/features/tests/types/tests.types";

const ZONA_CONFIG: Record<
  IkigaiZone,
  {
    label: string;
    description: string;
    variant: "success" | "info" | "neutral";
  }
> = {
  PROPOSITO_FUERTE: {
    label: "Propósito fuerte",
    description:
      "Tienes una alineación sólida entre lo que amas, en lo que eres bueno y lo que el mundo necesita.",
    variant: "success",
  },
  PROFESION_IDEAL: {
    label: "Profesión ideal",
    description:
      "Tienes claridad profesional. Tu talento y vocación apuntan hacia una carrera bien definida.",
    variant: "info",
  },
  EXPLORAR_MAS: {
    label: "Sigue explorando",
    description:
      "Aún estás descubriendo tu camino. Realiza más tests para afinar tu perfil vocacional.",
    variant: "neutral",
  },
};

interface ResultsScreenProps {
  result: VocalTestResult;
  onRestart: () => void;
  onViewProfile?: () => void;
}

export default function ResultsScreen({
  result,
  onRestart,
  onViewProfile,
}: ResultsScreenProps) {
  const zona = ZONA_CONFIG[result.zonaIkigai];

  const profile = {
    tecnologico: result.perfilTecnologico,
    cientifico: result.perfilCientifico,
    salud: result.perfilSalud,
    administrativo: result.perfilAdministrativo,
    social: result.perfilSocial,
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black-mode p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2 pt-4">
          <Tag label={zona.label} variant={zona.variant} />
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Tu perfil vocacional
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
            {zona.description}
          </p>
        </div>

        <Card
          padding="md"
          rounded="2xl"
          border="light"
          shadow="md"
          className="text-center"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-1">
            Score Ikigai global
          </p>
          <p className="text-5xl font-black text-primary">
            {Math.round(result.scoreGlobal)}
            <span className="text-2xl text-primary/60">%</span>
          </p>
        </Card>

        <Card padding="md" rounded="2xl" border="light" shadow="sm">
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
            Distribución por área
          </p>
          <RadarChart profile={profile} />
        </Card>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Tu perfil vocacional
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.keys(profile) as (keyof typeof profile)[]).map((area) => (
              <ProfileAreaCard key={area} area={area} value={profile[area]} />
            ))}
          </div>
        </div>

        {result.topCarreras.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Carreras recomendadas
            </p>
            <div className="space-y-2">
              {result.topCarreras.map((career, index) => (
                <TopCareersCard
                  key={career.id}
                  career={career}
                  ranking={index + 1}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pb-8">
          <Button
            variant="ghost"
            size="md"
            fullWidth
            leftIcon={<RotateCcw size={16} />}
            onClick={onRestart}
            className="border border-neutral-200 dark:border-neutral-700"
          >
            Realizar otro test
          </Button>
          {onViewProfile && (
            <Button
              variant="primary"
              size="md"
              fullWidth
              leftIcon={<User size={16} />}
              onClick={onViewProfile}
            >
              Ver en mi perfil
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
