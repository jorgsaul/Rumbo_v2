import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useKnowledgeTestStore } from "@/features/tests/stores/useKnowledgeTestStore";
import { getTestById, submitKnowledgeTest } from "../services/testService";
import type { Question } from "@/features/tests/types/tests.types";

export const useKnowledgeTest = () => {
  const router = useRouter();
  const {
    test,
    progress,
    result,
    isLoading,
    isSubmitting,
    setTest,
    setAnswer,
    setCurrentQuestion,
    setResult,
    setIsLoading,
    setIsSubmitting,
    resetProgress,
    resetAll,
  } = useKnowledgeTestStore();

  const loadTest = useCallback(
    async (testId: string) => {
      setIsLoading(true);
      try {
        const data = await getTestById(testId);
        setTest(data);
      } catch (error) {
        console.error("Error cargando test de conocimientos:", error);
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
  const currentAnswer = progress.answers[progress.currentQuestionIndex];
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
      submitResults();
    } else {
      setCurrentQuestion(progress.currentQuestionIndex + 1);
    }
  }, [isLastQuestion, progress.currentQuestionIndex, setCurrentQuestion]);

  const prevQuestion = useCallback(() => {
    setCurrentQuestion(Math.max(0, progress.currentQuestionIndex - 1));
  }, [progress.currentQuestionIndex, setCurrentQuestion]);

  const selectAnswer = useCallback(
    (label: string) => {
      setAnswer(progress.currentQuestionIndex, label);
    },
    [progress.currentQuestionIndex, setAnswer],
  );

  const submitResults = useCallback(async () => {
    if (!test) return;
    setIsSubmitting(true);

    try {
      const questions = test.questions;
      let correctAnswers = 0;

      questions.forEach((question, index) => {
        const selectedLabel = progress.answers[index];
        const correctOption = question.options.find((opt) => opt.isCorrect);
        if (correctOption && selectedLabel === correctOption.label) {
          correctAnswers++;
        }
      });

      const score = parseFloat(
        ((correctAnswers / totalQuestions) * 100).toFixed(2),
      );

      const saved = await submitKnowledgeTest({
        testId: test.id,
        score,
        correctAnswers,
        totalQuestions,
      });

      setResult(saved);
    } catch (error) {
      console.error("Error enviando resultados:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [test, progress.answers, totalQuestions, setIsSubmitting, setResult]);

  const restartTest = useCallback(() => {
    resetProgress();
  }, [resetProgress]);

  return {
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
  };
};
