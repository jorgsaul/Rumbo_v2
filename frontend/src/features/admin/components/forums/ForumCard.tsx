"use client";

import Card from "@/components/ui/Card";
import { Forum } from "@/features/forums/services/forumService";
import { cn } from "@/lib";
import { formatDate } from "@/utils/FormatDate";
import { Loader2, MessageSquare, ToggleLeft, ToggleRight } from "lucide-react";

export default function ForumCard({
  forum,
  onToggle,
  isUpdating,
}: {
  forum: Forum;
  onToggle: (id: string) => void;
  isUpdating: boolean;
}) {
  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      className={cn(!forum.isActive && "opacity-50")}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <MessageSquare size={16} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
            {forum.name}
          </p>
          <p className="text-xs text-neutral-400">
            {forum._count.posts} posts · {formatDate(forum.createdAt)}
          </p>
        </div>
        <button
          onClick={() => onToggle(forum.id)}
          disabled={isUpdating}
          className={cn(
            "p-1.5 rounded-lg transition-colors",
            forum.isActive
              ? "text-success hover:bg-success/10"
              : "text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
          )}
          title={forum.isActive ? "Desactivar" : "Activar"}
        >
          {isUpdating ? (
            <Loader2 size={16} className="animate-spin" />
          ) : forum.isActive ? (
            <ToggleRight size={16} />
          ) : (
            <ToggleLeft size={16} />
          )}
        </button>
      </div>
    </Card>
  );
}
