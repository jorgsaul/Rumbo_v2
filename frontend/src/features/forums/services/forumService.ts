import { api } from "@/lib";
import type { ApiResponse } from "@/types/api.types";
import type { Post } from "@/features/feed/types/feed.types";

export interface Forum {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
  imageUrl?: string | null;
  bannerUrl?: string | null;
  createdBy: { id: string; username: string };
  isMember: boolean;
  _count: { posts: number; members: number };
}

export interface ForumRequest {
  id: string;
  name: string;
  description?: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  user?: { id: string; username: string; avatarUrl?: string };
}

export const forumService = {
  getForums: async (): Promise<Forum[]> => {
    const { data } = await api.get<ApiResponse<Forum[]>>("/forums");
    return data.response;
  },

  getForumById: async (forumId: string): Promise<Forum> => {
    const { data } = await api.get<ApiResponse<Forum>>(`/forums/${forumId}`);
    return data.response;
  },

  getTopForums: async (): Promise<
    {
      id: string;
      name: string;
      imageUrl?: string | null;
      _count: { posts: number };
    }[]
  > => {
    const { data } = await api.get<ApiResponse<any[]>>("/forums/top");
    return data.response;
  },

  updateForum: async (
    forumId: string,
    data: { name?: string; description?: string },
  ): Promise<Forum> => {
    const { data: res } = await api.patch<ApiResponse<Forum>>(
      `/forums/${forumId}`,
      data,
    );
    return res.response;
  },

  updateForumImage: async (
    forumId: string,
    file: File,
    type: "image" | "banner",
  ): Promise<Forum> => {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await api.post<ApiResponse<Forum>>(
      `/forums/${forumId}/image?type=${type}`,
      formData,
    );
    return data.response;
  },

  joinForum: async (forumId: string): Promise<{ isMember: boolean }> => {
    const { data } = await api.post<ApiResponse<{ isMember: boolean }>>(
      `/forums/${forumId}/join`,
    );
    return data.response;
  },

  getMyForums: async (): Promise<Forum[]> => {
    const { data } = await api.get<ApiResponse<Forum[]>>("/forums/my");
    return data.response;
  },

  getForumPosts: async (forumId: string): Promise<Post[]> => {
    const { data } = await api.get<ApiResponse<Post[]>>(
      `/forums/${forumId}/posts`,
    );
    return data.response;
  },

  createRequest: async (data: {
    name: string;
    description?: string;
  }): Promise<ForumRequest> => {
    const { data: res } = await api.post<ApiResponse<ForumRequest>>(
      "/forums/requests",
      data,
    );
    return res.response;
  },

  // Admin
  adminGetRequests: async (status?: string): Promise<ForumRequest[]> => {
    const { data } = await api.get<ApiResponse<ForumRequest[]>>(
      `/forums/admin/requests${status ? `?status=${status}` : ""}`,
    );
    return data.response;
  },

  adminResolveRequest: async (
    requestId: string,
    action: "APPROVED" | "REJECTED",
  ): Promise<void> => {
    await api.patch(`/forums/admin/requests/${requestId}`, { action });
  },

  adminToggleForum: async (forumId: string): Promise<void> => {
    await api.patch(`/forums/admin/${forumId}/toggle`);
  },
};
