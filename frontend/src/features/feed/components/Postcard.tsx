"use client";

import { Card, IconButton } from "@/components/ui";
import { PostHeader } from "./Postheader";
import { PostActions } from "./Postactions";
import { CommentSection } from "./CommentSection";
import type { Post } from "../types/feed.types";
import Image from "next/image";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { feedService } from "../services/feedService";
import { useConfirmation } from "@/context/ConfirmationContext";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: Post;
  onLike?: () => void;
  onReport?: () => void;
  onSave?: () => void;
  onDeleted?: (postId: string) => void;
}

export function PostCard({
  post,
  onLike,
  onReport,
  onSave,
  onDeleted,
}: PostCardProps) {
  const [deleting, setDeleting] = useState(false);
  const { user } = useAuthStore();
  const { confirm } = useConfirmation();
  const router = useRouter();

  const isOwner = user?.id === post.author.id;

  const handleDelete = async () => {
    const approved = await confirm({
      title: "¿Deseas eliminar tu publicacion?",
      description: "Esta acción no es reversible",
      category: "warning",
    });
    if (!approved) return;

    setDeleting(true);
    try {
      await feedService.deletePost(post.id);
      onDeleted?.(post.id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card
      shadow="none"
      border="light"
      rounded="xl"
      padding="md"
      clickable="none"
      className="flex flex-col gap-4 cursor-pointer"
      onClick={() =>
        router.push(`/foros/${post.forumId ?? "general"}/${post.id}`)
      }
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <PostHeader post={post} />
        </div>
        {isOwner && (
          <div onClick={(e) => e.stopPropagation()}>
            <IconButton icon={Trash2} label="Eliminar" onClick={handleDelete} />
          </div>
        )}
      </div>

      {post.title && (
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white leading-snug">
          {post.title}
        </h3>
      )}

      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
        {post.content}
      </p>

      {post.mediaUrl && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <Image
            src={post.mediaUrl}
            alt="imagen del post"
            fill
            className="object-cover"
          />
        </div>
      )}

      <PostActions
        post={post}
        onLike={onLike}
        onComment={() =>
          router.push(`/foros/${post.forumId ?? "general"}/${post.id}`)
        }
        onReport={onReport}
        onSave={onSave}
      />
    </Card>
  );
}
