"use client";

import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  MessageSquare,
  Heart,
  Users,
  FileQuestion,
  EyeOff,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib";
import { formatDate } from "@/utils/FormatDate";
import type {
  Notification,
  NotificationType,
} from "../types/notification.types";

const TYPE_CONFIG: Record<NotificationType, { icon: any; color: string }> = {
  NEW_POST_FOLLOWED: { icon: Users, color: "text-primary bg-primary/10" },
  POST_COMMENT: { icon: MessageSquare, color: "text-info bg-info/10" },
  COMMENT_REPLY: { icon: MessageSquare, color: "text-info bg-info/10" },
  FORUM_REQUEST: { icon: FileQuestion, color: "text-success bg-success/10" },
  POST_HIDDEN: { icon: EyeOff, color: "text-warning bg-warning/10" },
  ACCOUNT_DEACTIVATED: { icon: ShieldAlert, color: "text-danger bg-danger/10" },
};

function NotificationItem({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead: (id: string) => void;
}) {
  const router = useRouter();
  const config = TYPE_CONFIG[notification.type];
  const Icon = config.icon;

  const handleClick = () => {
    if (!notification.read) onRead(notification.id);
    if (notification.link) router.push(notification.link);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left",
        !notification.read && "bg-primary/5 dark:bg-primary/10",
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
          config.color,
        )}
      >
        <Icon size={15} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-900 dark:text-white leading-tight">
          {notification.title}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
          {notification.body}
        </p>
        <p className="text-xs text-neutral-400 mt-1">
          {formatDate(notification.createdAt)}
        </p>
      </div>
      {!notification.read && (
        <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
      )}
    </button>
  );
}

interface NotificationPanelProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClose: () => void;
}

export default function NotificationPanel({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onClose,
}: NotificationPanelProps) {
  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Bell size={15} className="text-neutral-700 dark:text-neutral-300" />
          <p className="text-sm font-semibold text-neutral-900 dark:text-white">
            Notificaciones
          </p>
          {unreadCount > 0 && (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary text-white font-medium">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Check size={11} />
            Marcar todas
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <Bell size={24} className="text-neutral-300" />
            <p className="text-sm text-neutral-400">Sin notificaciones</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {notifications.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onRead={onMarkAsRead}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
