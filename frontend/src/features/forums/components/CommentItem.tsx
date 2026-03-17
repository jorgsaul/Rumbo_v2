"use client";

import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { feedService } from "@/features/feed/services/feedService";
import type { PostComment } from "@/features/feed/types/feed.types";
import { cn } from "@/lib";
import { formatDate } from "@/utils/FormatDate";
import { Loader2, Reply, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CommentItem({
  comment,
  postId,
  onReplyCreated,
  depth = 0,
}: {
  comment: PostComment;
  postId: string;
  onReplyCreated: (reply: PostComment, parentId: string) => void;
  depth?: number;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthStore();

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await feedService.createComment(
        postId,
        replyContent,
        comment.id,
      );
      if (res.ok) {
        onReplyCreated(res.response, comment.id);
        setReplyContent("");
        setShowReplyForm(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "flex gap-3",
        depth > 0 &&
          "ml-8 pl-3 border-l-2 border-neutral-100 dark:border-neutral-800",
      )}
    >
      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden mt-0.5">
        {comment.author.avatarUrl ? (
          <Image
            src={comment.author.avatarUrl}
            alt=""
            width={28}
            height={28}
            className="object-cover"
          />
        ) : (
          <span className="text-xs font-bold text-primary">
            {comment.author.username.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex-1 space-y-1.5">
        <div className="flex items-center gap-2">
          <Link
            href={`/profile/${comment.author.username}`}
            className="text-xs font-semibold text-neutral-900 dark:text-white hover:text-primary transition-colors"
          >
            @{comment.author.username}
          </Link>
          <span className="text-xs text-neutral-400">
            {formatDate(comment.createdAt)}
          </span>
        </div>

        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {comment.content}
        </p>

        {depth === 0 && (
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-primary transition-colors"
          >
            <Reply size={12} />
            Responder
          </button>
        )}

        {showReplyForm && (
          <div className="flex gap-2 mt-2">
            <input
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleReply()}
              placeholder={`Responder a @${comment.author.username}...`}
              className="flex-1 h-8 px-3 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 outline-none focus:border-primary transition-colors"
            />
            <button
              onClick={handleReply}
              disabled={isSubmitting || !replyContent.trim()}
              className="p-1.5 rounded-lg bg-primary text-white hover:bg-primary/80 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Send size={13} />
              )}
            </button>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-3 mt-3">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                postId={postId}
                onReplyCreated={onReplyCreated}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
