import { create } from "zustand";
import type {
  Test,
  KnowledgeProgress,
  KnowledgeTestResult,
} from "@/features/tests/types/tests.types";

interface KnowledgeTestState {
  test: Test | null;
  progress: KnowledgeProgress;
  result: KnowledgeTestResult | null;
  isLoading: boolean;
  isSubmitting: boolean;

  setTest: (test: Test) => void;
  setAnswer: (index: number, label: string) => void;
  setCurrentQuestion: (index: number) => void;
  setResult: (result: KnowledgeTestResult) => void;
  setIsLoading: (value: boolean) => void;
  setIsSubmitting: (value: boolean) => void;
  resetProgress: () => void;
  resetAll: () => void;
}

const initialProgress: KnowledgeProgress = {
  currentQuestionIndex: 0,
  answers: {},
  savedAt: 0,
};

export const useKnowledgeTestStore = create<KnowledgeTestState>((set) => ({
  test: null,
  progress: initialProgress,
  result: null,
  isLoading: false,
  isSubmitting: false,

  setTest: (test) => set({ test }),

  setAnswer: (index, label) =>
    set((state) => ({
      progress: {
        ...state.progress,
        answers: { ...state.progress.answers, [index]: label },
        savedAt: Date.now(),
      },
    })),

  setCurrentQuestion: (index) =>
    set((state) => ({
      progress: { ...state.progress, currentQuestionIndex: index },
    })),

  setResult: (result) => set({ result }),

  setIsLoading: (value) => set({ isLoading: value }),

  setIsSubmitting: (value) => set({ isSubmitting: value }),

  resetProgress: () =>
    set({
      progress: { ...initialProgress, savedAt: Date.now() },
      result: null,
    }),

  resetAll: () =>
    set({
      test: null,
      progress: initialProgress,
      result: null,
      isLoading: false,
      isSubmitting: false,
    }),
}));
