import type { User } from "@/types/user.types";

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

export interface ModerationStats {
  pending: number;
  approved: number;
  rejected: number;
  flagged: number;
  hidden: number;
}

export interface AdminFlaggedPost {
  id: string;
  title?: string | null;
  content: string;
  mediaUrl?: string | null;
  moderation: string;
  isHidden: boolean;
  createdAt: string;
  author: { id: string; username: string; avatarUrl?: string };
  reports: {
    id: string;
    createdAt: string;
    reporter: { id: string; username: string };
  }[];
  _count: { reports: number };
}

export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: "STUDENT" | "AUTHOR" | "ADMIN";
  isActive: boolean;
  avatarUrl?: string | null;
  educationLevel?: string | null;
  createdAt: string;
  _count: { posts: number; followers: number; following: number };
}

export interface DraftOption {
  id?: string;
  label: string;
  text: string;
  isCorrect: boolean;
  order: number;
  imageUrl?: string | null;
}

export interface DraftQuestion {
  id?: string;
  text: string;
  order: number;
  pilar?: string;
  imageUrl?: string | null;
  statements?: { type: string; data: any };
  options: DraftOption[];
}
