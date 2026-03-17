"use client";
import { Forum } from "../services/forumService";
import { useRouter } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { Card } from "@/components/ui";
import { formatDate } from "@/utils/FormatDate";

export default function ForumCard({ forum }: { forum: Forum }) {
  const router = useRouter();

  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      clickable="lift"
      className="space-y-3 cursor-pointer"
      onClick={() => {
        console.log(forum.id);
        router.push(`/foros/${forum.id}`);
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <MessageSquare size={18} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
            {forum.name}
          </p>
          {forum.description && (
            <p className="text-xs text-neutral-400 mt-0.5 line-clamp-2">
              {forum.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-neutral-400">
          <MessageSquare size={12} />
          {forum._count.posts} publicaciones
        </div>
        <p className="text-xs text-neutral-400">
          {formatDate(forum.createdAt)}
        </p>
      </div>
    </Card>
  );
}
