import prisma from "../lib/prisma";

export type NotificationType =
  | "NEW_POST_FOLLOWED"
  | "POST_COMMENT"
  | "COMMENT_REPLY"
  | "FORUM_REQUEST"
  | "POST_HIDDEN"
  | "ACCOUNT_DEACTIVATED";

export const createNotificationService = async (
  userId: string,
  type: NotificationType,
  title: string,
  body: string,
  link?: string,
) => {
  return prisma.notification.create({
    data: { userId, type, title, body, link },
  });
};

export const getMyNotificationsService = async (userId: string) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 30,
  });
};

export const markAsReadService = async (
  userId: string,
  notificationId: string,
) => {
  return prisma.notification.update({
    where: { id: notificationId, userId },
    data: { read: true },
  });
};

export const markAllAsReadService = async (userId: string) => {
  return prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  });
};

export const getUnreadCountService = async (userId: string) => {
  return prisma.notification.count({
    where: { userId, read: false },
  });
};
