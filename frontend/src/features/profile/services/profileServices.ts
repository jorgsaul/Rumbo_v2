import { get, post, patch } from "@/lib";
import type { Response } from "@/features/auth/types/auth.types";
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
  getMe: (): Promise<Response<ProfileData>> =>
    get<Response<ProfileData>>("/users/me"),

  getUserPosts: (userId: string): Promise<Response<Post[]>> =>
    get<Response<Post[]>>(`/users/${userId}/posts`),

  getUserLikes: (userId: string): Promise<Response<Post[]>> =>
    get<Response<Post[]>>(`/users/${userId}/likes`),

  getUserSaved: (userId: string): Promise<Response<Post[]>> =>
    get<Response<Post[]>>(`/users/${userId}/saved`),

  getUserComments: (userId: string): Promise<Response<PostComment[]>> =>
    get<Response<PostComment[]>>(`/users/${userId}/comments`),

  getUserByUsername: (username: string): Promise<Response<any>> =>
    get<Response<any>>(`/users/username/${username}`),

  followUser: (userId: string): Promise<Response<{ isFollowing: boolean }>> =>
    post<Response<{ isFollowing: boolean }>>(`/users/${userId}/follow`, {}),

  updateMe: (
    data: Partial<Pick<ProfileData, "fullName" | "bio" | "isPrivate">>,
  ): Promise<Response<ProfileData>> =>
    patch<Response<ProfileData>>("/users/me", data),

  searchUsers: (q: string): Promise<Response<any[]>> =>
    get<Response<any[]>>(`/users/search?q=${encodeURIComponent(q)}`),

  updateAvatar: (
    file: File,
  ): Promise<Response<{ id: string; avatarUrl: string }>> => {
    const formData = new FormData();
    formData.append("avatar", file);
    return patch<Response<{ id: string; avatarUrl: string }>>(
      "/users/avatar",
      formData,
    );
  },

  updateBanner: (
    file: File,
  ): Promise<Response<{ id: string; bannerUrl: string }>> => {
    const formData = new FormData();
    formData.append("banner", file);
    return patch<Response<{ id: string; bannerUrl: string }>>(
      "/users/banner",
      formData,
    );
  },
};
