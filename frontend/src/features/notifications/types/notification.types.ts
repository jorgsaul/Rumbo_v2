export type NotificationType =
  | "NEW_POST_FOLLOWED"
  | "POST_COMMENT"
  | "COMMENT_REPLY"
  | "FORUM_REQUEST"
  | "POST_HIDDEN"
  | "ACCOUNT_DEACTIVATED";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  link?: string | null;
  createdAt: string;
}
