import { create } from "zustand";
import type {
  Test,
  VocationalProgress,
  VocalTestResult,
} from "@/features/tests/types/tests.types";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import type { StorageValue } from "zustand/middleware";

interface VocationalTestState {
  test: Test | null;
  progress: VocationalProgress;
  result: VocalTestResult | null;
  isLoading: boolean;
  isCalculating: boolean;
  showWelcome: boolean;
  userId: string | null;

  setTest: (test: Test) => void;
  setAnswer: (questionId: string, value: number) => void;
  setCurrentQuestion: (index: number) => void;
  setResult: (result: VocalTestResult) => void;
  setIsLoading: (value: boolean) => void;
  setIsCalculating: (value: boolean) => void;
  setShowWelcome: (value: boolean) => void;
  setUserId: (userId: string) => void;
  resetProgress: () => void;
  resetAll: () => void;
}

type PersistedState = {
  progress: VocationalProgress;
  result: VocalTestResult | null;
  showWelcome: boolean;
  userId: string | null;
};

const initialProgress: VocationalProgress = {
  currentQuestionIndex: 0,
  answers: {},
  savedAt: 0,
};

export const useVocationalTestStore = create<VocationalTestState>()(
  persist(
    (set, get) => ({
      test: null,
      progress: initialProgress,
      result: null,
      isLoading: false,
      isCalculating: false,
      showWelcome: true,
      userId: null,

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
      setUserId: (userId: string) => set({ userId }),

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
          userId: null,
        }),
    }),
    {
      name: "vocacional_progress",
      storage: {
        getItem: (name): StorageValue<VocationalTestState> | null => {
          const base = localStorage.getItem(name);
          if (!base) return null;
          const parsed = JSON.parse(base);
          const userId = parsed?.state?.userId;
          if (!userId) return parsed;
          const userKey = `${name}_${userId}`;
          const userItem = localStorage.getItem(userKey);
          return userItem ? JSON.parse(userItem) : null;
        },
        setItem: (name, value) => {
          const userId = (value as any)?.state?.userId;
          if (!userId) return;
          const userKey = `${name}_${userId}`;
          localStorage.setItem(userKey, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
      partialize: (state) =>
        ({
          progress: state.progress,
          result: state.result,
          showWelcome: state.showWelcome,
          userId: state.userId,
        }) as unknown as VocationalTestState,
    },
  ),
);
