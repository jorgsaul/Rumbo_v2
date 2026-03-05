import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import {
  AdminStats,
  AdminFlaggedPost,
  AdminQuestion,
  AdminReport,
  AdminTestFull,
  AdminTestSummary,
  AdminUser,
  CreateTestData,
  ModerationStats,
} from "../types/admin.types";
import { Ticket } from "@/features/support/types/support.types";

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
  getModerationStats: async (): Promise<ModerationStats> => {
    const { data } = await api.get<ApiResponse<ModerationStats>>(
      "/feed/admin/moderation/stats",
    );
    return data.response;
  },
  getReports: async (): Promise<AdminFlaggedPost[]> => {
    const { data } = await api.get<ApiResponse<AdminFlaggedPost[]>>(
      "/feed/admin/reports",
    );
    return data.response;
  },
  moderatePost: async (
    postId: string,
    action: "APPROVE" | "REJECT",
  ): Promise<void> => {
    await api.patch(`/feed/admin/posts/${postId}/moderate`, { action });
  },
  uploadTestImage: async (
    file: File,
    folder: "questions" | "options",
  ): Promise<{ url: string; publicId: string }> => {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await api.post<
      ApiResponse<{ url: string; publicId: string }>
    >(`/tests/admin/upload-image?folder=${folder}`, formData);
    return data.response;
  },
  getUsers: async (search?: string): Promise<AdminUser[]> => {
    const { data } = await api.get<ApiResponse<AdminUser[]>>(
      `/users/admin/users${search ? `?search=${search}` : ""}`,
    );
    return data.response;
  },
  updateUser: async (
    userId: string,
    data: { role?: string; isActive?: boolean },
  ): Promise<void> => {
    await api.patch(`/users/admin/users/${userId}`, data);
  },
  getTickets: async (status?: string): Promise<Ticket[]> => {
    const { data } = await api.get<ApiResponse<Ticket[]>>(
      `/tickets/admin${status ? `?status=${status}` : ""}`,
    );
    return data.response;
  },
  updateTicket: async (
    ticketId: string,
    data: { status?: string; adminReply?: string },
  ): Promise<void> => {
    await api.patch(`/tickets/admin/${ticketId}`, data);
  },
};
