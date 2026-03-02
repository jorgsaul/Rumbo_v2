"use client";

import {
  Clock,
  BookOpen,
  Save,
  GraduationCap,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { Card, Button, Tag } from "@/components/ui";
import type { Test } from "@/features/tests/types/tests.types";

interface WelcomeScreenProps {
  test: Test;
  onStart: () => void;
}

const FEATURE_ITEMS = [
  {
    icon: BookOpen,
    label: "Basado en Ikigai",
    description: "4 pilares: Pasión, Vocación, Profesión y Misión",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Save,
    label: "Progreso guardado",
    description: "Continúa donde lo dejaste en cualquier momento",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: GraduationCap,
    label: "Resultados detallados",
    description: "Carreras recomendadas con análisis de compatibilidad",
    color: "text-success",
    bg: "bg-success/10",
  },
];

export default function WelcomeScreen({ test, onStart }: WelcomeScreenProps) {
  const totalQuestions = test.questions.length;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50 dark:bg-black-mode">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-3">
          <Tag label="Test Vocacional" variant="primary" />
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white leading-tight">
            {test.title}
          </h1>
          {test.description && (
            <p className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed max-w-lg mx-auto">
              {test.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 rounded-full">
            <Clock size={14} />
            <span>{test.estimatedMinutes} minutos aprox.</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 rounded-full">
            <BookOpen size={14} />
            <span>{totalQuestions} preguntas</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FEATURE_ITEMS.map((item) => (
            <Card
              key={item.label}
              padding="md"
              rounded="xl"
              border="light"
              shadow="sm"
              className="text-center space-y-2"
            >
              <div
                className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mx-auto`}
              >
                <item.icon size={20} className={item.color} />
              </div>
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                {item.label}
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        <Card padding="md" rounded="xl" border="light" shadow="none">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
            Pilares del test
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              {
                label: "Pasión",
                desc: "Lo que amas",
                variant: "danger" as const,
              },
              {
                label: "Vocación",
                desc: "En lo que eres bueno",
                variant: "info" as const,
              },
              {
                label: "Profesión",
                desc: "Por lo que te pagan",
                variant: "success" as const,
              },
              {
                label: "Misión",
                desc: "Lo que el mundo necesita",
                variant: "warning" as const,
              },
            ].map((pilar) => (
              <div
                key={pilar.label}
                className="text-center p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 space-y-1"
              >
                <Tag label={pilar.label} variant={pilar.variant} />
                <p className="text-xs text-neutral-400 mt-1">{pilar.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          hoverEffect="lift"
          rightIcon={<ArrowRight size={18} />}
          onClick={onStart}
        >
          Comenzar test
        </Button>

        <p className="text-center text-xs text-neutral-400">
          Responde con honestidad — no hay respuestas correctas o incorrectas
        </p>
      </div>
    </div>
  );
}
