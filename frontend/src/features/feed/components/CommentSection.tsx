"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/utils/FormatDate";
import { feedService } from "../services/feedService";
import { PostComment } from "../types/feed.types";
import { Button } from "@/components/ui";
import { Send } from "lucide-react";

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await feedService.getComments(postId);
        if (res.ok) setComments(res.response);
      } finally {
        setIsFetching(false);
      }
    };
    fetch();
  }, [postId]);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsLoading(true);
    try {
      const res = await feedService.createComment(postId, content);
      if (res.ok) {
        setComments((prev) => [...prev, res.response]);
        setContent("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
      <div className="flex gap-2 items-center">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Escribe un comentario..."
          className="flex-1 h-9 px-3 text-sm rounded-lg border-2 border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 focus:outline-none focus:border-primary transition-colors"
        />
        <Button
          size="sm"
          onClick={handleSubmit}
          loading={isLoading}
          leftIcon={<Send size={14} />}
        >
          Enviar
        </Button>
      </div>

      {isFetching ? (
        <p className="text-xs text-neutral-400">Cargando comentarios...</p>
      ) : comments.length === 0 ? (
        <p className="text-xs text-neutral-400">Sé el primero en comentar</p>
      ) : (
        <div className="flex flex-col gap-2">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-primary">
                  {comment.author.username.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-neutral-900 dark:text-white">
                  {comment.author.username} ·{" "}
                  <span className="text-neutral-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </span>
                <span className="text-sm text-neutral-600 dark:text-neutral-300">
                  {comment.content}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
