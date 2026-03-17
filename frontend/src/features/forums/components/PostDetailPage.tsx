"use client";

import Card from "@/components/ui/Card";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { feedService } from "@/features/feed/services/feedService";
import type { Post, PostComment } from "@/features/feed/types/feed.types";
import { cn } from "@/lib";
import { formatDate } from "@/utils/FormatDate";
import { ArrowLeft, Heart, Loader2, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";

interface PostDetailPageProps {
  postId: string;
  forumId: string;
}

export default function PostDetailPage({
  postId,
  forumId,
}: PostDetailPageProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    const load = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          feedService.getPostById(postId),
          feedService.getComments(postId),
        ]);
        if (postRes.ok) setPost(postRes.response);
        if (commentsRes.ok) setComments(commentsRes.response);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [postId]);

  const handleComment = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await feedService.createComment(postId, content);
      if (res.ok) {
        setComments((prev) => [...prev, { ...res.response, replies: [] }]);
        setContent("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplyCreated = (reply: PostComment, parentId: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === parentId
          ? { ...c, replies: [...(c.replies ?? []), reply] }
          : c,
      ),
    );
  };

  const handleLike = async () => {
    if (!post) return;
    const res = await feedService.likePost(post.id);
    if (res.ok) {
      setPost((prev) =>
        prev
          ? {
              ...prev,
              isLiked: res.response.isLiked,
              likes: prev.likes + (res.response.isLiked ? 1 : -1),
            }
          : prev,
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 gap-3">
        <Loader2 size={20} className="animate-spin text-primary" />
        <span className="text-sm text-neutral-400">Cargando...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <p className="text-sm text-danger text-center py-8">
        Publicación no encontrada
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-12">
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <p className="text-sm text-neutral-400">Publicación</p>
      </div>

      <Card
        padding="md"
        rounded="xl"
        border="light"
        shadow="sm"
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
            {post.author.avatarUrl ? (
              <Image
                src={post.author.avatarUrl}
                alt=""
                width={36}
                height={36}
                className="object-cover"
              />
            ) : (
              <span className="text-xs font-bold text-primary">
                {post.author.username.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <Link
              href={`/profile/${post.author.username}`}
              className="text-sm font-semibold text-neutral-900 dark:text-white hover:text-primary transition-colors"
            >
              @{post.author.username}
            </Link>
            <p className="text-xs text-neutral-400">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        {post.title && (
          <h1 className="text-lg font-bold text-neutral-900 dark:text-white leading-snug">
            {post.title}
          </h1>
        )}

        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {post.content}
        </p>

        {post.mediaUrl && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image src={post.mediaUrl} alt="" fill className="object-cover" />
          </div>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag.name}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 pt-1 border-t border-neutral-100 dark:border-neutral-800">
          <button
            onClick={handleLike}
            className={cn(
              "flex items-center gap-1.5 text-sm transition-colors",
              post.isLiked
                ? "text-danger"
                : "text-neutral-400 hover:text-danger",
            )}
          >
            <Heart size={16} className={post.isLiked ? "fill-danger" : ""} />
            {post.likes}
          </button>
          <span className="text-sm text-neutral-400">
            {comments.length} comentarios
          </span>
        </div>
      </Card>

      <Card padding="md" rounded="xl" border="light" shadow="sm">
        <div className="flex gap-3">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-primary">
              {user?.username.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 flex gap-2">
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleComment()}
              placeholder="Escribe un comentario..."
              className="flex-1 h-9 px-3 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 outline-none focus:border-primary transition-colors"
            />
            <button
              onClick={handleComment}
              disabled={isSubmitting || !content.trim()}
              className="p-2 rounded-lg bg-primary text-white hover:bg-primary/80 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Send size={15} />
              )}
            </button>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-neutral-400 text-center py-6">
            Sé el primero en comentar
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              onReplyCreated={handleReplyCreated}
            />
          ))
        )}
      </div>
    </div>
  );
}
