export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: "BUG" | "QUESTION" | "SUGGESTION" | "OTHER";
  status: "OPEN" | "IN_REVIEW" | "RESOLVED";
  adminReply?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: { id: string; username: string; avatarUrl?: string; email: string };
}
