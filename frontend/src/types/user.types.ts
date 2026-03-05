export type UserRole = "ADMIN" | "STUDENT" | "AUTHOR";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatarUrl?: string | null;
  fullName?: string;
}
