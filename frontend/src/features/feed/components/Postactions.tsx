"use client";

import { Heart, MessageCircle, Flag, Bookmark } from "lucide-react";
import { IconButton } from "@/components/ui";
import type { Post } from "../types/feed.types";

interface PostActionsProps {
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
  onReport?: () => void;
  onSave?: () => void;
}

export function PostActions({
  post,
  onLike,
  onComment,
  onReport,
  onSave,
}: PostActionsProps) {
  return (
    <div className="flex items-center gap-5">
      <IconButton
        icon={Heart}
        label="Me gusta"
        onClick={onLike}
        active={post.isLiked}
        count={post.likes}
        activeClassName="text-danger"
      />

      <IconButton
        icon={MessageCircle}
        label="Comentar"
        onClick={onComment}
        count={post.commentsCount}
      />

      <IconButton
        icon={Flag}
        label="Reportar"
        onClick={onReport}
        active={post.isReported}
        activeClassName="text-danger fill-danger"
      />

      <IconButton
        icon={Bookmark}
        label="Guardar"
        onClick={onSave}
        active={post.isSaved}
        className="ml-auto"
        activeClassName="text-primary"
      />
    </div>
  );
}
