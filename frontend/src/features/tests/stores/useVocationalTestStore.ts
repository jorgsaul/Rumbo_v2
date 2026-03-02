import { create } from "zustand";
import type {
  Test,
  VocationalProgress,
  VocalTestResult,
} from "@/features/tests/types/tests.types";

interface VocationalTestState {
  test: Test | null;
  progress: VocationalProgress;
  result: VocalTestResult | null;
  isLoading: boolean;
  isCalculating: boolean;
  showWelcome: boolean;

  setTest: (test: Test) => void;
  setAnswer: (questionId: string, value: number) => void;
  setCurrentQuestion: (index: number) => void;
  setResult: (result: VocalTestResult) => void;
  setIsLoading: (value: boolean) => void;
  setIsCalculating: (value: boolean) => void;
  setShowWelcome: (value: boolean) => void;
  resetProgress: () => void;
  resetAll: () => void;
}

const initialProgress: VocationalProgress = {
  currentQuestionIndex: 0,
  answers: {},
  savedAt: 0,
};

export const useVocationalTestStore = create<VocationalTestState>((set) => ({
  test: null,
  progress: initialProgress,
  result: null,
  isLoading: false,
  isCalculating: false,
  showWelcome: true,

  setTest: (test) => set({ test }),

  setAnswer: (questionId, value) =>
    set((state) => ({
      progress: {
        ...state.progress,
        answers: { ...state.progress.answers, [questionId]: value },
        savedAt: Date.now(),
      },
    })),

  setCurrentQuestion: (index) =>
    set((state) => ({
      progress: { ...state.progress, currentQuestionIndex: index },
    })),

  setResult: (result) => set({ result }),

  setIsLoading: (value) => set({ isLoading: value }),

  setIsCalculating: (value) => set({ isCalculating: value }),

  setShowWelcome: (value) => set({ showWelcome: value }),

  resetProgress: () =>
    set({
      progress: { ...initialProgress, savedAt: Date.now() },
      result: null,
      showWelcome: true,
    }),

  resetAll: () =>
    set({
      test: null,
      progress: initialProgress,
      result: null,
      isLoading: false,
      isCalculating: false,
      showWelcome: true,
    }),
}));
