"use client";
import { Forum, forumService } from "../services/forumService";
import { useRouter } from "next/navigation";
import { MessageSquare, Users, Check } from "lucide-react";
import { Card, Button } from "@/components/ui";
import { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";

export default function ForumCard({ forum: initialForum }: { forum: Forum }) {
  const [forum, setForum] = useState(initialForum);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const isCreator = forum.createdBy.id === user?.id;
  const router = useRouter();

  const handleJoin = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      const res = await forumService.joinForum(forum.id);
      setForum((prev) => ({
        ...prev,
        isMember: res.isMember,
        _count: {
          ...prev._count,
          members: prev._count.members + (res.isMember ? 1 : -1),
        },
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      rounded="xl"
      border="light"
      shadow="sm"
      clickable="lift"
      className="cursor-pointer overflow-hidden p-0"
      onClick={() => router.push(`/foros/${forum.id}`)}
    >
      <div className="w-full h-20 bg-primary/10 relative">
        {forum.bannerUrl ? (
          <Image src={forum.bannerUrl} alt="" fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5" />
        )}
        <div className="absolute -bottom-4 left-4 w-10 h-10 rounded-xl border-2 border-white dark:border-neutral-900 bg-primary/10 overflow-hidden">
          {forum.imageUrl ? (
            <Image src={forum.imageUrl} alt="" fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <MessageSquare size={16} className="text-primary" />
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 px-4 pb-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
              {forum.name}
            </p>
            {forum.description && (
              <p className="text-xs text-neutral-400 mt-0.5 line-clamp-2">
                {forum.description}
              </p>
            )}
          </div>
          {!isCreator && (
            <Button
              variant={forum.isMember ? "ghost" : "primary"}
              size="sm"
              loading={isLoading}
              onClick={handleJoin}
              leftIcon={forum.isMember ? <Check size={13} /> : undefined}
              className="shrink-0 text-xs"
            >
              {forum.isMember ? "Unido" : "Unirse"}
            </Button>
          )}

          {isCreator && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/foros/${forum.id}/editar`)}
            >
              Editar
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-1">
            <MessageSquare size={12} />
            {forum._count.posts} posts
          </div>
          <div className="flex items-center gap-1">
            <Users size={12} />
            {forum._count.members} miembros
          </div>
        </div>
      </div>
    </Card>
  );
}
