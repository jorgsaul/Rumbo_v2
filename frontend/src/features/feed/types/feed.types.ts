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
  forumId: string | null;
  moderation?: ModerationStatus;
  forum: { id: string; name: string } | null;
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
  post?: {
    id: string;
    title?: string | null;
    content: string;
  };
  content: string;
  isHidden: boolean;
  createdAt: string;
  parentId?: string | null;
  replies?: PostComment[];
  _count?: { replies: number };
}

export interface TagWithCategory {
  id: string;
  name: string;
  category: { name: string; color: string };
}
