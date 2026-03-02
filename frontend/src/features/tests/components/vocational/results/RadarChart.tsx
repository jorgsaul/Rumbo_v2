"use client";

import {
  RadarChart as RechartsRadar,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { VocationalProfile } from "@/features/tests/types/tests.types";

const AREA_LABELS: Record<keyof VocationalProfile, string> = {
  tecnologico: "Tecnológico",
  cientifico: "Científico",
  salud: "Salud",
  administrativo: "Administrativo",
  social: "Social",
};

interface RadarChartProps {
  profile: VocationalProfile;
}

export default function RadarChart({ profile }: RadarChartProps) {
  const data = (Object.keys(profile) as (keyof VocationalProfile)[]).map(
    (key) => ({
      area: AREA_LABELS[key],
      value: profile[key],
      fullMark: 100,
    }),
  );

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RechartsRadar data={data}>
        <PolarGrid
          stroke="currentColor"
          className="text-neutral-200 dark:text-neutral-700"
        />
        <PolarAngleAxis
          dataKey="area"
          tick={{ fontSize: 11, fill: "currentColor" }}
          className="text-neutral-500 dark:text-neutral-400"
        />
        <Tooltip
          formatter={(value: number | undefined) => [
            `${value ?? 0}%`,
            "Afinidad",
          ]}
          contentStyle={{
            borderRadius: "0.75rem",
            border: "1px solid #e5e7eb",
            fontSize: "0.75rem",
          }}
        />
        <Radar
          name="Perfil"
          dataKey="value"
          stroke="var(--color-primary)"
          fill="var(--color-primary)"
          fillOpacity={0.15}
          strokeWidth={2}
          dot={{ r: 3, fill: "var(--color-primary)" }}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
