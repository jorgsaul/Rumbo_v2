import { Tag } from "@/components/ui";
import type { Post } from "../types/feed.types";
import { formatDate } from "@/utils/FormatDate";
import Link from "next/link";
import Image from "next/image";

const TAG_VARIANTS: Record<
  string,
  "primary" | "success" | "info" | "warning" | "danger"
> = {
  "Mi experiencia": "success",
  Orientación: "primary",
  Recursos: "info",
  Pregunta: "warning",
};

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  const initials = post.author.username.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
          {post.author.avatarUrl ? (
            <Image
              src={post.author.avatarUrl}
              alt={post.author.username}
              width={36}
              height={36}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-xs font-semibold text-primary">
              {initials}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-neutral-900 dark:text-white leading-tight cursor-pointer hover:text-primary">
            <Link href={`/profile/${post.author.username}`}>
              {post.author.username}
            </Link>
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-neutral-400 capitalize">
              {post.author.role === "STUDENT" ? "Estudiante" : "Autor"}
            </span>
            <span className="text-neutral-300 dark:text-neutral-600">·</span>
            <span className="text-xs text-neutral-400">
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap justify-end">
        {post.tags.map((tag) => (
          <Tag key={tag} label={tag} variant={TAG_VARIANTS[tag] ?? "neutral"} />
        ))}
      </div>
    </div>
  );
}
