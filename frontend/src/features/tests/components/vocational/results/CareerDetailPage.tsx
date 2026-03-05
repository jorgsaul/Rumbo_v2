"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Heart,
  Target,
  Globe,
} from "lucide-react";
import { CAREERS } from "@/features/tests/helpers/careersData";
import { useVocationalTestStore } from "@/features/tests/stores/useVocationalTestStore";
import { cn } from "@/lib/utils/cn";
import Card from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import {
  ZONA_CONFIG,
  MATERIA_LABELS,
  ODS_LABELS,
  PILAR_CONFIG,
} from "@/features/tests/helpers/careerConstants";

export default function CareerDetailPage({ careerId }: { careerId: string }) {
  const router = useRouter();
  const result = useVocationalTestStore((s) => s.result);

  const career = CAREERS.find((c) => c.id.toString() === careerId);
  const careerResult =
    result?.topCarreras?.find((c) => c.id === careerId) ??
    result?.resultadosCompletos?.find((c) => c.id === careerId);

  if (!career) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <p className="text-sm text-neutral-400">Carrera no encontrada</p>
        <button
          onClick={() => router.back()}
          className="text-sm text-primary hover:underline"
        >
          Regresar
        </button>
      </div>
    );
  }

  const zona = careerResult ? ZONA_CONFIG[careerResult.zonaIkigai] : null;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-5 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">
            {career.nombre}
          </h1>
          <p className="text-xs text-neutral-400">{career.area}</p>
        </div>
        {zona && <Tag label={zona.label} variant={zona.variant} />}
      </div>

      {/* Compatibilidad */}
      {careerResult && (
        <Card
          padding="md"
          rounded="2xl"
          border="light"
          shadow="sm"
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Tu compatibilidad
            </p>
            <span className="text-2xl font-black text-primary">
              {careerResult.compatibility}%
            </span>
          </div>

          <div className="space-y-2">
            {(
              Object.entries(careerResult.scores) as [
                keyof typeof PILAR_CONFIG,
                number,
              ][]
            ).map(([pilar, score]) => {
              const cfg = PILAR_CONFIG[pilar];
              return (
                <div key={pilar} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs font-medium", cfg.text)}>
                      {cfg.label}
                    </span>
                    <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                      {score}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700",
                        cfg.color,
                      )}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Unidades */}
      <Card
        padding="md"
        rounded="xl"
        border="light"
        shadow="sm"
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <MapPin size={15} className="text-primary shrink-0" />
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Dónde estudiarla
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {career.unidades.map((u) => (
            <span
              key={u}
              className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium"
            >
              {u}
            </span>
          ))}
        </div>
      </Card>

      {/* Materias */}
      <Card
        padding="md"
        rounded="xl"
        border="light"
        shadow="sm"
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <GraduationCap size={15} className="text-info shrink-0" />
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Materias clave
          </p>
        </div>
        <div className="space-y-2">
          {(Object.entries(career.vocacion.materias) as [string, number][]).map(
            ([materia, nivel]) => (
              <div key={materia} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    {MATERIA_LABELS[materia] ?? materia}
                  </span>
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                    {nivel}/10
                  </span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-info rounded-full"
                    style={{ width: `${nivel * 10}%` }}
                  />
                </div>
              </div>
            ),
          )}
        </div>
        <div className="pt-1">
          <p className="text-xs text-neutral-400">
            Dificultad académica:{" "}
            <span className="font-semibold text-neutral-600 dark:text-neutral-300">
              {career.vocacion.dificultad_academica}/10
            </span>
          </p>
        </div>
      </Card>

      {(career.vocacion.habilidades_tecnicas?.length ||
        career.vocacion.habilidades_blandas?.length) && (
        <Card
          padding="md"
          rounded="xl"
          border="light"
          shadow="sm"
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <Target size={15} className="text-success shrink-0" />
            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Habilidades
            </p>
          </div>
          {career.vocacion.habilidades_tecnicas?.length && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest">
                Técnicas
              </p>
              <div className="flex flex-wrap gap-2">
                {career.vocacion.habilidades_tecnicas.map((h) => (
                  <span
                    key={h}
                    className="text-xs px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}
          {career.vocacion.habilidades_blandas?.length && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest">
                Blandas
              </p>
              <div className="flex flex-wrap gap-2">
                {career.vocacion.habilidades_blandas.map((h) => (
                  <span
                    key={h}
                    className="text-xs px-2.5 py-1 rounded-lg bg-success/10 text-success"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      <Card
        padding="md"
        rounded="xl"
        border="light"
        shadow="sm"
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <Briefcase size={15} className="text-warning shrink-0" />
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Mercado laboral
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 space-y-0.5">
            <p className="text-xs text-neutral-400">Salario inicial</p>
            <p className="text-sm font-bold text-neutral-800 dark:text-neutral-100">
              ${career.profesion.salario_inicial.toLocaleString("es-MX")}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 space-y-0.5">
            <p className="text-xs text-neutral-400">Con experiencia</p>
            <p className="text-sm font-bold text-neutral-800 dark:text-neutral-100">
              ${career.profesion.salario_experiencia.toLocaleString("es-MX")}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 space-y-0.5">
            <p className="text-xs text-neutral-400">Empleabilidad</p>
            <p className="text-sm font-bold text-neutral-800 dark:text-neutral-100">
              {career.profesion.empleabilidad}%
            </p>
          </div>
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 space-y-0.5">
            <p className="text-xs text-neutral-400">Demanda</p>
            <p className="text-sm font-bold text-neutral-800 dark:text-neutral-100">
              {career.profesion.demanda}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {career.profesion.sectores.map((s) => (
            <span
              key={s}
              className="text-xs px-2.5 py-1 rounded-lg bg-warning/10 text-warning-700 dark:text-warning"
            >
              {s}
            </span>
          ))}
        </div>
      </Card>

      <Card
        padding="md"
        rounded="xl"
        border="light"
        shadow="sm"
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <Heart size={15} className="text-danger shrink-0" />
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Impacto y propósito
          </p>
        </div>
        <div className="space-y-2">
          {career.mision.problemas.map((p) => (
            <div key={p} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-danger mt-1.5 shrink-0" />
              <p className="text-xs text-neutral-600 dark:text-neutral-300">
                {p}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-1">
          <div>
            <p className="text-xs text-neutral-400">Impacto social</p>
            <p className="text-sm font-bold text-neutral-700 dark:text-neutral-200">
              {career.mision.impacto_social}/10
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Contribución nacional</p>
            <p className="text-sm font-bold text-neutral-700 dark:text-neutral-200">
              {career.mision.contribucion_nacional}/10
            </p>
          </div>
        </div>
      </Card>

      {career.mision.ods?.length && (
        <Card
          padding="md"
          rounded="xl"
          border="light"
          shadow="sm"
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <Globe size={15} className="text-info shrink-0" />
            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Objetivos de Desarrollo Sostenible
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {career.mision.ods.map((num) => (
              <div
                key={num}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-info/10"
              >
                <span className="text-xs font-bold text-info">ODS {num}</span>
                <span className="text-xs text-neutral-500">
                  {ODS_LABELS[num]}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
