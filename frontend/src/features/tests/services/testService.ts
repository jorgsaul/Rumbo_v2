import { api } from "@/lib/axios";
import type {
  Test,
  TestSummary,
  TestResult,
  VocalTestResult,
  KnowledgeTestResult,
  SubmitVocationalPayload,
  SubmitKnowledgePayload,
} from "@/features/tests/types/tests.types";

type ApiResponse<T> = { ok: boolean; response: T };

export const getTests = async (): Promise<TestSummary[]> => {
  const { data } = await api.get<ApiResponse<TestSummary[]>>("/tests");
  return data.response;
};

export const getTestById = async (testId: string): Promise<Test> => {
  const { data } = await api.get<ApiResponse<Test>>(`/tests/${testId}`);
  return data.response;
};

export const submitVocationalTest = async (
  payload: SubmitVocationalPayload,
): Promise<VocalTestResult> => {
  const { data } = await api.post<ApiResponse<VocalTestResult>>(
    "/tests/vocational/submit",
    payload,
  );
  return data.response;
};

export const submitKnowledgeTest = async (
  payload: SubmitKnowledgePayload,
): Promise<KnowledgeTestResult> => {
  const { data } = await api.post<ApiResponse<KnowledgeTestResult>>(
    "/tests/knowledge/submit",
    payload,
  );
  return data.response;
};

export const getUserResults = async (userId: string): Promise<TestResult[]> => {
  const { data } = await api.get<ApiResponse<TestResult[]>>(
    `/tests/results/${userId}`,
  );
  return data.response;
};

export const getLatestVocationalResult =
  async (): Promise<VocalTestResult | null> => {
    const { data } = await api.get<ApiResponse<VocalTestResult | null>>(
      "/tests/vocational/latest",
    );
    return data.response;
  };
