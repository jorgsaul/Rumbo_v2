import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useVocationalTestStore } from "@/features/tests/stores/useVocationalTestStore";
import { getTestById, submitVocationalTest } from "../services/testService";
import { calcularIkigai } from "@/features/tests/helpers/ikigaiCalculator";
import type { Question } from "@/features/tests/types/tests.types";

export const useVocationalTest = () => {
  const router = useRouter();
  const {
    test,
    progress,
    result,
    isLoading,
    isCalculating,
    showWelcome,
    setTest,
    setAnswer,
    setCurrentQuestion,
    setResult,
    setIsLoading,
    setIsCalculating,
    setShowWelcome,
    resetProgress,
    resetAll,
  } = useVocationalTestStore();

  const loadTest = useCallback(
    async (testId: string) => {
      setIsLoading(true);
      try {
        const data = await getTestById(testId);
        setTest(data);
      } catch (error) {
        console.error("Error cargando test vocacional:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setTest, setIsLoading],
  );

  const currentQuestion: Question | null =
    test?.questions[progress.currentQuestionIndex] ?? null;

  const totalQuestions = test?.questions.length ?? 0;
  const answeredCount = Object.keys(progress.answers).length;
  const progressPercentage =
    totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;
  const currentAnswer = currentQuestion
    ? progress.answers[currentQuestion.id]
    : undefined;
  const isLastQuestion = progress.currentQuestionIndex === totalQuestions - 1;

  const goToQuestion = useCallback(
    (index: number) => {
      if (!test) return;
      const clamped = Math.max(0, Math.min(index, totalQuestions - 1));
      setCurrentQuestion(clamped);
    },
    [test, totalQuestions, setCurrentQuestion],
  );

  const nextQuestion = useCallback(() => {
    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestion(progress.currentQuestionIndex + 1);
    }
  }, [isLastQuestion, progress.currentQuestionIndex, setCurrentQuestion]);

  const prevQuestion = useCallback(() => {
    setCurrentQuestion(Math.max(0, progress.currentQuestionIndex - 1));
  }, [progress.currentQuestionIndex, setCurrentQuestion]);

  const selectAnswer = useCallback(
    (value: number) => {
      if (!currentQuestion) return;
      setAnswer(currentQuestion.id, value);
    },
    [currentQuestion, setAnswer],
  );

  const calculateResults = useCallback(async () => {
    if (!test) return;
    setIsCalculating(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const {
        profile,
        topCareers,
        resultadosCompletos,
        scoreGlobal,
        zonaIkigai,
      } = calcularIkigai(progress.answers, test.questions);

      const saved = await submitVocationalTest({
        testId: test.id,
        answers: progress.answers,
        profile,
        topCareers,
        resultadosCompletos,
        scoreGlobal,
        zonaIkigai,
      });

      setResult(saved);
    } catch (error) {
      console.error("Error calculando/guardando resultados:", error);
    } finally {
      setIsCalculating(false);
    }
  }, [test, progress.answers, setIsCalculating, setResult]);

  const startTest = useCallback(() => {
    resetProgress();
    setShowWelcome(false);
  }, [resetProgress, setShowWelcome]);

  const restartTest = useCallback(() => {
    resetProgress();
    setShowWelcome(true);
  }, [resetProgress, setShowWelcome]);

  return {
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
  };
};
