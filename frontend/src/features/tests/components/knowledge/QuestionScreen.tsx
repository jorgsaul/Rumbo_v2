"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { Question } from "@/features/tests/types/tests.types";
import StatementQuestion from "./StatementQuestion";
import MathText from "@/components/ui/MathText";

interface KnowledgeQuestionScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
  progressPercentage: number;
  currentAnswer: string | undefined;
  answers: Record<number, string>;
  isLastQuestion: boolean;
  onSelectAnswer: (label: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function KnowledgeQuestionScreen({
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
}: KnowledgeQuestionScreenProps) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black-mode p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            {question.id.slice(0, 8)}...
          </span>
          <span className="text-sm text-neutral-400">
            {answeredCount}/{totalQuestions} respondidas
          </span>
        </div>

        <div className="space-y-1">
          <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400">
              Pregunta {currentIndex + 1} de {totalQuestions}
            </span>
            <span className="text-xs text-neutral-400">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: totalQuestions }).map((_, index) => {
            const isAnswered = answers[index] !== undefined;
            const isCurrent = index === currentIndex;
            return (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  isCurrent && "bg-primary w-4",
                  !isCurrent && isAnswered && "bg-success",
                  !isCurrent &&
                    !isAnswered &&
                    "bg-neutral-200 dark:bg-neutral-700",
                )}
              />
            );
          })}
        </div>

        <Card
          padding="lg"
          rounded="2xl"
          border="light"
          shadow="md"
          className="space-y-5"
        >
          <StatementQuestion question={question} />

          <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 leading-snug">
            <MathText text={question.text} />
          </h2>

          <div className="space-y-2">
            {question.options.map((option) => {
              const isSelected = currentAnswer === option.label;
              return (
                <button
                  key={option.id}
                  onClick={() => onSelectAnswer(option.label)}
                  className={cn(
                    "w-full flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-200",
                    "hover:border-primary/40 hover:-translate-y-0.5",
                    isSelected
                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                      : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900",
                  )}
                >
                  <span
                    className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500",
                    )}
                  >
                    <MathText text={option.label} />
                  </span>

                  <div className="flex-1 min-w-0">
                    {option.imageUrl ? (
                      <img
                        src={option.imageUrl}
                        alt={`Opción ${option.label}`}
                        className="max-h-24 object-contain rounded-lg"
                      />
                    ) : (
                      <span
                        className={cn(
                          "text-sm leading-snug transition-colors",
                          isSelected
                            ? "text-primary font-medium"
                            : "text-neutral-700 dark:text-neutral-300",
                        )}
                      >
                        <MathText text={option.text} />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <div className="flex items-center justify-between gap-3 pb-6">
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
            {isLastQuestion ? "Finalizar" : "Siguiente"}
          </Button>
        </div>
      </div>
    </div>
  );
}
