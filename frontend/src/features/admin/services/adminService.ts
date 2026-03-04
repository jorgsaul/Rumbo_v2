import { api } from "@/lib/axios";

type ApiResponse<T> = { ok: boolean; response: T; message: string };

export interface AdminTestSummary {
  id: string;
  title: string;
  description?: string | null;
  type: "VOCATIONAL" | "KNOWLEDGE";
  status: "DRAFT" | "ACTIVE" | "INACTIVE";
  estimatedMinutes: number;
  createdAt: string;
  updatedAt: string;
  _count: { questions: number; vocalResults: number; knowledgeResults: number };
}

export interface AdminStats {
  totalUsers: number;
  totalTests: number;
  totalVocational: number;
  totalKnowledge: number;
  testStats: {
    id: string;
    title: string;
    type: string;
    _count: { vocalResults: number; knowledgeResults: number };
  }[];
}

export interface CreateTestData {
  title: string;
  description?: string;
  type: "VOCATIONAL" | "KNOWLEDGE";
  estimatedMinutes?: number;
}

export interface AdminQuestion {
  id: string;
  testId: string;
  text: string;
  order: number;
  pilar?: string | null;
  imageUrl?: string | null;
  statements?: any;
  options: {
    id: string;
    label: string;
    text: string;
    isCorrect: boolean;
    order: number;
    imageUrl?: string | null;
  }[];
}

export interface AdminTestFull extends AdminTestSummary {
  questions: AdminQuestion[];
}
export const adminService = {
  getStats: async (): Promise<AdminStats> => {
    const { data } =
      await api.get<ApiResponse<AdminStats>>("/tests/admin/stats");
    return data.response;
  },
  getTests: async (): Promise<AdminTestSummary[]> => {
    const { data } =
      await api.get<ApiResponse<AdminTestSummary[]>>("/tests/admin/tests");
    return data.response;
  },
  createTest: async (payload: CreateTestData): Promise<AdminTestSummary> => {
    const { data } = await api.post<ApiResponse<AdminTestSummary>>(
      "/tests/admin/tests",
      payload,
    );
    return data.response;
  },
  updateTest: async (
    testId: string,
    payload: Partial<CreateTestData & { status: string }>,
  ): Promise<AdminTestSummary> => {
    const { data } = await api.patch<ApiResponse<AdminTestSummary>>(
      `/tests/admin/tests/${testId}`,
      payload,
    );
    return data.response;
  },
  deleteTest: async (testId: string): Promise<void> => {
    await api.delete(`/tests/admin/tests/${testId}`);
  },
  getTestById: async (testId: string): Promise<AdminTestFull> => {
    const { data } = await api.get<ApiResponse<AdminTestFull>>(
      `/tests/admin/tests/${testId}`,
    );
    return data.response;
  },
  upsertQuestions: async (
    testId: string,
    questions: (Omit<AdminQuestion, "testId" | "id" | "options"> & {
      id?: string;
      options: (Omit<AdminQuestion["options"][number], "id"> & {
        id?: string;
      })[];
    })[],
  ): Promise<AdminTestFull> => {
    const { data } = await api.put<ApiResponse<AdminTestFull>>(
      `/tests/admin/tests/${testId}/questions`,
      { questions },
    );
    return data.response;
  },
};
