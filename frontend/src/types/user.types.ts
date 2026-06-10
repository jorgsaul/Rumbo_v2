export type UserRole = "ADMIN" | "STUDENT" | "AUTHOR";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatarUrl?: string | null;
  fullName?: string;
  isActive: boolean; 
}

export interface LoginResponse extends User {
  token: string;
}