import { get, post, deletePop } from "@/lib";
import type { Post, PostComment } from "../types/feed.types";
import type { ApiResponse } from "@/types/api.types";

export const feedService = {
  getPosts: (tag?: string): Promise<ApiResponse<Post[]>> => {
    const url = tag ? `/feed?tag=${encodeURIComponent(tag)}` : "/feed";
    return get<ApiResponse<Post[]>>(url);
  },

  uploadImage: async (
    file: File,
  ): Promise<ApiResponse<{ url: string; publicId: string }>> => {
    const formData = new FormData();
    formData.append("image", file);
    return post<ApiResponse<{ url: string; publicId: string }>>(
      "/feed/upload-image",
      formData,
    );
  },

  createPost: async (data: {
    title?: string;
    content: string;
    tags?: string[];
    mediaUrl?: string;
    mediaPublicId?: string;
    forumId?: string;
  }): Promise<ApiResponse<Post>> => post<ApiResponse<Post>>("/feed", data),

  deletePost: (postId: string): Promise<ApiResponse<null>> =>
    deletePop<ApiResponse<null>>(`/feed/${postId}`),

  likePost: (
    postId: string,
  ): Promise<ApiResponse<{ likes: number; isLiked: boolean }>> => {
    return post<ApiResponse<{ likes: number; isLiked: boolean }>>(
      `/feed/${postId}/like`,
      {},
    );
  },

  savePost: (postId: string): Promise<ApiResponse<{ isSaved: boolean }>> => {
    return post<ApiResponse<{ isSaved: boolean }>>(`/feed/${postId}/save`, {});
  },

  reportPost: (postId: string, reason?: string): Promise<ApiResponse<null>> => {
    return post<ApiResponse<null>>(`/feed/${postId}/report`, { reason });
  },

  getComments: (postId: string): Promise<ApiResponse<PostComment[]>> =>
    get<ApiResponse<PostComment[]>>(`/feed/${postId}/comments`),

  createComment: (
    postId: string,
    content: string,
  ): Promise<ApiResponse<PostComment>> =>
    post<ApiResponse<PostComment>>(`/feed/${postId}/comments`, { content }),

  deleteComment: (
    postId: string,
    commentId: string,
  ): Promise<ApiResponse<null>> =>
    post<ApiResponse<null>>(`/feed/${postId}/comments/${commentId}`, {}),

  getTags: (): Promise<ApiResponse<{ id: string; name: string }[]>> =>
    get<ApiResponse<{ id: string; name: string }[]>>("/feed/tags"),

  searchPosts: (q: string): Promise<ApiResponse<Post[]>> =>
    get<ApiResponse<Post[]>>(`/feed/search?q=${encodeURIComponent(q)}`),
};
