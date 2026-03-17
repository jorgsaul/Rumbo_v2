import { api } from "@/lib";
import type { ApiResponse } from "@/types/api.types";
import type { Notification } from "../types/notification.types";

export const notificationService = {
  getAll: async (): Promise<Notification[]> => {
    const { data } =
      await api.get<ApiResponse<Notification[]>>("/notifications");
    return data.response;
  },

  getUnreadCount: async (): Promise<number> => {
    const { data } = await api.get<ApiResponse<number>>(
      "/notifications/unread",
    );
    return data.response;
  },

  markAsRead: async (notificationId: string): Promise<void> => {
    await api.patch(`/notifications/${notificationId}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
    await api.patch("/notifications/read-all");
  },
};
