import { User } from "@/features/auth/types/auth.types";

export type ModerationStatus = "pending" | "approved" | "rejected" | "flagged";

export interface Post {
  id: string;
  author: User;
  title?: string;
  content: string;
  mediaUrl?: string;
  tags: string[];
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
  isReported: boolean;
  commentsCount: number;
  createdAt: string;
  moderation?: ModerationStatus;
}

export interface PostComment {
  id: string;
  author: {
    id: string;
    username: string;
    fullName: string;
    avatarUrl?: string;
    role: string;
  };
  content: string;
  isHidden: boolean;
  createdAt: string;
  post?: {
    id: string;
    title: string;
    content: string;
  };
}
