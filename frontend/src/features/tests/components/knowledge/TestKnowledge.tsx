"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKnowledgeTest } from "@/features/tests/hooks/useKnowledgeTest";
import LoadingScreen from "../vocational/LoadingScreen";
import KnowledgeQuestionScreen from "./QuestionScreen";
import KnowledgeResultsScreen from "./results/ResultScreen";

interface TestKnowledgeProps {
  testId: string;
}

export default function TestKnowledge({ testId }: TestKnowledgeProps) {
  const router = useRouter();

  const {
    test,
    progress,
    result,
    isLoading,
    isSubmitting,
    currentQuestion,
    currentAnswer,
    totalQuestions,
    answeredCount,
    progressPercentage,
    isLastQuestion,
    loadTest,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    restartTest,
    resetAll,
  } = useKnowledgeTest();

  useEffect(() => {
    loadTest(testId);
    return () => resetAll();
  }, [testId]);

  // ─── Estados de carga ────────────────────────────────────────────────────────

  if (isLoading || !test) return <LoadingScreen />;
  if (isSubmitting) return <LoadingScreen />;

  // ─── Resultados ──────────────────────────────────────────────────────────────

  if (result) {
    return (
      <KnowledgeResultsScreen
        result={result}
        testTitle={test.title}
        onRestart={restartTest}
        onBack={() => router.push("/tests")}
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <KnowledgeQuestionScreen
      question={currentQuestion}
      currentIndex={progress.currentQuestionIndex}
      totalQuestions={totalQuestions}
      answeredCount={answeredCount}
      progressPercentage={progressPercentage}
      currentAnswer={currentAnswer}
      answers={progress.answers}
      isLastQuestion={isLastQuestion}
      onSelectAnswer={selectAnswer}
      onNext={nextQuestion}
      onPrev={prevQuestion}
    />
  );
}
