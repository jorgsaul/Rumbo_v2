"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVocationalTest } from "@/features/tests/hooks/useVocationalTest";
import WelcomeScreen from "./WelcomeScreen";
import LoadingScreen from "./LoadingScreen";
import QuestionScreen from "./QuestionScreen";
import ResultsScreen from "./results/ResultsScreen";

interface TestVocacionalProps {
  testId: string;
}

export default function TestVocacional({ testId }: TestVocacionalProps) {
  const router = useRouter();

  const {
    test,
    progress,
    result,
    isLoading,
    isCalculating,
    showWelcome,
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
    startTest,
    restartTest,
    resetAll,
  } = useVocationalTest();

  useEffect(() => {
    loadTest(testId);
  }, [testId]);

  if (isLoading || !test) {
    return <LoadingScreen />;
  }

  if (isCalculating) {
    return <LoadingScreen />;
  }

  if (result) {
    return (
      <ResultsScreen
        result={result}
        onRestart={restartTest}
        onViewProfile={() => router.push("/profile?tab=tests")}
      />
    );
  }

  if (showWelcome) {
    return <WelcomeScreen test={test} onStart={startTest} />;
  }

  if (!currentQuestion) return null;

  return (
    <QuestionScreen
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
      onGoToQuestion={goToQuestion}
      onRestart={restartTest}
    />
  );
}
