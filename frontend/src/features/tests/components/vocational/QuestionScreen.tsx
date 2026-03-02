"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import type { Question } from "@/features/tests/types/tests.types";

const LIKERT_OPTIONS = [
  { value: 1, label: "Nada" },
  { value: 2, label: "Poco" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Bastante" },
  { value: 5, label: "Muchísimo" },
] as const;

const PILAR_VARIANT = {
  PASION: "danger",
  VOCACION: "info",
  PROFESION: "success",
  MISION: "warning",
} as const;

interface QuestionScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
  progressPercentage: number;
  currentAnswer: number | undefined;
  answers: Record<string, number>;
  isLastQuestion: boolean;
  onSelectAnswer: (value: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onGoToQuestion: (index: number) => void;
  onRestart: () => void;
}

export default function QuestionScreen({
  question,
  currentIndex,
  totalQuestions,
  answeredCount,
  progressPercentage,
  currentAnswer,
  answers,
  isLastQuestion,
  onSelectAnswer,
  onNext,
  onPrev,
  onGoToQuestion,
  onRestart,
}: QuestionScreenProps) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black-mode p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {question.pilar && (
              <Tag
                label={question.pilar}
                variant={PILAR_VARIANT[question.pilar]}
              />
            )}
            <span className="text-sm text-neutral-400">
              {answeredCount}/{totalQuestions} respondidas
            </span>
          </div>
          <button
            onClick={onRestart}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          >
            <RotateCcw size={13} />
            Reiniciar
          </button>
        </div>

        <div className="space-y-1">
          <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-neutral-400 text-right">
            {Math.round(progressPercentage)}% completado
          </p>
        </div>

        <Card padding="sm" rounded="xl" border="light" shadow="none">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {Array.from({ length: totalQuestions }).map((_, index) => {
              const questionId = question.id;
              const isAnswered = answers && Object.keys(answers).length > index;
              const isCurrent = index === currentIndex;

              return (
                <button
                  key={index}
                  onClick={() => onGoToQuestion(index)}
                  className={cn(
                    "w-7 h-7 rounded-lg text-xs font-semibold transition-all duration-200",
                    isCurrent && "bg-primary text-white scale-110",
                    !isCurrent && isAnswered && "bg-success/20 text-success",
                    !isCurrent &&
                      !isAnswered &&
                      "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700",
                  )}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </Card>

        <Card padding="lg" rounded="2xl" border="light" shadow="md">
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest">
                Pregunta {currentIndex + 1} de {totalQuestions}
              </p>
              <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 leading-snug">
                {question.text}
              </h2>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {LIKERT_OPTIONS.map(({ value, label }) => {
                const isSelected = currentAnswer === value;
                return (
                  <button
                    key={value}
                    onClick={() => onSelectAnswer(value)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200",
                      "hover:-translate-y-0.5 hover:shadow-md",
                      isSelected
                        ? "border-primary bg-primary/5 dark:bg-primary/10"
                        : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:border-primary/40",
                    )}
                  >
                    <span
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500",
                      )}
                    >
                      {value}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-medium text-center leading-tight transition-colors",
                        isSelected ? "text-primary" : "text-neutral-400",
                      )}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="md"
            disabled={currentIndex === 0}
            leftIcon={<ChevronLeft size={16} />}
            onClick={onPrev}
            className="border border-neutral-200 dark:border-neutral-700"
          >
            Anterior
          </Button>

          <Button
            variant="primary"
            size="md"
            disabled={!currentAnswer}
            rightIcon={<ChevronRight size={16} />}
            onClick={onNext}
          >
            {isLastQuestion ? "Ver resultados" : "Siguiente"}
          </Button>
        </div>
      </div>
    </div>
  );
}
