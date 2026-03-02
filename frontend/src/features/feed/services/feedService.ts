import { get, post, deletePop } from "@/lib";
import type { Post, PostComment } from "../types/feed.types";
import type { Response } from "@/features/auth/types/auth.types";

export const feedService = {
  getPosts: (tag?: string): Promise<Response<Post[]>> => {
    const url = tag ? `/feed?tag=${encodeURIComponent(tag)}` : "/feed";
    return get<Response<Post[]>>(url);
  },

  createPost: (data: {
    title?: string;
    content: string;
    tags: string[];
  }): Promise<Response<Post>> => post<Response<Post>>("/feed", data),

  deletePost: (postId: string): Promise<Response<null>> =>
    deletePop<Response<null>>(`/feed/${postId}`),

  likePost: (
    postId: string,
  ): Promise<Response<{ likes: number; isLiked: boolean }>> => {
    return post<Response<{ likes: number; isLiked: boolean }>>(
      `/feed/${postId}/like`,
      {},
    );
  },

  savePost: (postId: string): Promise<Response<{ isSaved: boolean }>> => {
    return post<Response<{ isSaved: boolean }>>(`/feed/${postId}/save`, {});
  },

  reportPost: (postId: string, reason?: string): Promise<Response<null>> => {
    return post<Response<null>>(`/feed/${postId}/report`, { reason });
  },

  getComments: (postId: string): Promise<Response<PostComment[]>> =>
    get<Response<PostComment[]>>(`/feed/${postId}/comments`),

  createComment: (
    postId: string,
    content: string,
  ): Promise<Response<PostComment>> =>
    post<Response<PostComment>>(`/feed/${postId}/comments`, { content }),

  deleteComment: (postId: string, commentId: string): Promise<Response<null>> =>
    post<Response<null>>(`/feed/${postId}/comments/${commentId}`, {}),

  getTags: (): Promise<Response<{ id: string; name: string }[]>> =>
    get<Response<{ id: string; name: string }[]>>("/feed/tags"),

  searchPosts: (q: string): Promise<Response<Post[]>> =>
    get<Response<Post[]>>(`/feed/search?q=${encodeURIComponent(q)}`),
};
