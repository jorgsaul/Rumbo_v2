import { get, post, patch } from "@/lib";
import type { ApiResponse } from "@/types/api.types";
import type { Post, PostComment } from "@/features/feed/types/feed.types";

export interface ProfileData {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  educationLevel?: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  isPrivate: boolean;
  createdAt: string;
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
}

export const profileService = {
  getMe: (): Promise<ApiResponse<ProfileData>> =>
    get<ApiResponse<ProfileData>>("/users/me"),

  getUserPosts: (userId: string): Promise<ApiResponse<Post[]>> =>
    get<ApiResponse<Post[]>>(`/users/${userId}/posts`),

  getUserLikes: (userId: string): Promise<ApiResponse<Post[]>> =>
    get<ApiResponse<Post[]>>(`/users/${userId}/likes`),

  getUserSaved: (userId: string): Promise<ApiResponse<Post[]>> =>
    get<ApiResponse<Post[]>>(`/users/${userId}/saved`),

  getUserComments: (userId: string): Promise<ApiResponse<PostComment[]>> =>
    get<ApiResponse<PostComment[]>>(`/users/${userId}/comments`),

  getUserByUsername: (username: string): Promise<ApiResponse<any>> =>
    get<ApiResponse<any>>(`/users/username/${username}`),

  followUser: (
    userId: string,
  ): Promise<ApiResponse<{ isFollowing: boolean }>> =>
    post<ApiResponse<{ isFollowing: boolean }>>(`/users/${userId}/follow`, {}),

  updateMe: (
    data: Partial<Pick<ProfileData, "fullName" | "bio" | "isPrivate">>,
  ): Promise<ApiResponse<ProfileData>> =>
    patch<ApiResponse<ProfileData>>("/users/me", data),

  searchUsers: (q: string): Promise<ApiResponse<any[]>> =>
    get<ApiResponse<any[]>>(`/users/search?q=${encodeURIComponent(q)}`),

  updateAvatar: (
    file: File,
  ): Promise<ApiResponse<{ id: string; avatarUrl: string }>> => {
    const formData = new FormData();
    formData.append("avatar", file);
    return patch<ApiResponse<{ id: string; avatarUrl: string }>>(
      "/users/avatar",
      formData,
    );
  },

  updateBanner: (
    file: File,
  ): Promise<ApiResponse<{ id: string; bannerUrl: string }>> => {
    const formData = new FormData();
    formData.append("banner", file);
    return patch<ApiResponse<{ id: string; bannerUrl: string }>>(
      "/users/banner",
      formData,
    );
  },
};
