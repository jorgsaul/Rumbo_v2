import { useState, useEffect } from "react";
import { getTests } from "../services/testService";
import type { TestSummary, TestType } from "@/features/tests/types/tests.types";

interface UseTestsState {
  tests: TestSummary[];
  isLoading: boolean;
  error: string | null;
}

export const useTests = () => {
  const [state, setState] = useState<UseTestsState>({
    tests: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await getTests();
        setState({ tests: data, isLoading: false, error: null });
      } catch {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "No se pudieron cargar los tests. Intenta de nuevo.",
        }));
      }
    };

    fetchTests();
  }, []);

  const vocationalTests = state.tests.filter((t) => t.type === "VOCATIONAL");
  const knowledgeTests = state.tests.filter((t) => t.type === "KNOWLEDGE");

  return {
    ...state,
    vocationalTests,
    knowledgeTests,
  };
};
