import { User } from "@/types/user.types";
import { ModerationStatus } from "@/types/common.types";

export interface Post {
  id: string;
  author: User;
  title?: string;
  content: string;
  mediaUrl?: string;
  tags: PostTag[];
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
  isReported: boolean;
  commentsCount: number;
  createdAt: string;
  moderation?: ModerationStatus;
}

export interface PostTag {
  name: string;
  color: string;
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
