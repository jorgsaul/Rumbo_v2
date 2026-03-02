"use client";

import { RotateCcw, CheckCircle, XCircle, Trophy } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils/cn";
import type { KnowledgeTestResult } from "@/features/tests/types/tests.types";

const getScoreConfig = (score: number) => {
  if (score >= 80)
    return {
      label: "Excelente",
      variant: "success" as const,
      color: "text-success",
    };
  if (score >= 60)
    return { label: "Bien", variant: "info" as const, color: "text-info" };
  if (score >= 40)
    return {
      label: "Regular",
      variant: "warning" as const,
      color: "text-warning-700",
    };
  return {
    label: "A mejorar",
    variant: "danger" as const,
    color: "text-danger",
  };
};

interface KnowledgeResultsScreenProps {
  result: KnowledgeTestResult;
  testTitle: string;
  onRestart: () => void;
  onBack: () => void;
}

export default function KnowledgeResultsScreen({
  result,
  testTitle,
  onRestart,
  onBack,
}: KnowledgeResultsScreenProps) {
  const config = getScoreConfig(result.score);
  const incorrectAnswers = result.totalQuestions - result.correctAnswers;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black-mode p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2 pt-4">
          <Tag label={config.label} variant={config.variant} />
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Resultados del test
          </h1>
          <p className="text-sm text-neutral-400">{testTitle}</p>
        </div>

        <Card
          padding="lg"
          rounded="2xl"
          border="light"
          shadow="md"
          className="text-center space-y-2"
        >
          <Trophy size={32} className={cn("mx-auto", config.color)} />
          <p className={cn("text-6xl font-black", config.color)}>
            {Math.round(result.score)}
            <span className="text-3xl opacity-60">%</span>
          </p>
          <p className="text-sm text-neutral-400">Puntaje obtenido</p>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card
            padding="md"
            rounded="xl"
            border="light"
            shadow="sm"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
              <CheckCircle size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {result.correctAnswers}
              </p>
              <p className="text-xs text-neutral-400">Correctas</p>
            </div>
          </Card>

          <Card
            padding="md"
            rounded="xl"
            border="light"
            shadow="sm"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center shrink-0">
              <XCircle size={20} className="text-danger" />
            </div>
            <div>
              <p className="text-2xl font-bold text-danger">
                {incorrectAnswers}
              </p>
              <p className="text-xs text-neutral-400">Incorrectas</p>
            </div>
          </Card>
        </div>

        <Card
          padding="md"
          rounded="xl"
          border="light"
          shadow="none"
          className="space-y-3"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Preguntas respondidas
            </span>
            <span className="text-neutral-400">
              {result.correctAnswers}/{result.totalQuestions}
            </span>
          </div>
          <div className="w-full h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-700", {
                "bg-success": result.score >= 80,
                "bg-info": result.score >= 60 && result.score < 80,
                "bg-warning": result.score >= 40 && result.score < 60,
                "bg-danger": result.score < 40,
              })}
              style={{ width: `${result.score}%` }}
            />
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 pb-8">
          <Button
            variant="ghost"
            size="md"
            fullWidth
            leftIcon={<RotateCcw size={16} />}
            onClick={onRestart}
            className="border border-neutral-200 dark:border-neutral-700"
          >
            Intentar de nuevo
          </Button>
          <Button variant="primary" size="md" fullWidth onClick={onBack}>
            Volver a tests
          </Button>
        </div>
      </div>
    </div>
  );
}
