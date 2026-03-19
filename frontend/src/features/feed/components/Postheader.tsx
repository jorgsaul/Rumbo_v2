import type { Post } from "../types/feed.types";
import { formatDate } from "@/utils/FormatDate";
import Link from "next/link";
import Image from "next/image";

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
          <div className="flex items-center gap-1.5">
            {post.forum && (
              <>
                <Link
                  href={`/foros/${post.forum.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  {post.forum.name}
                </Link>
                <span className="text-neutral-300 dark:text-neutral-600">
                  ·
                </span>
              </>
            )}
            <span className="text-sm font-semibold text-neutral-900 dark:text-white leading-tight cursor-pointer hover:text-primary">
              <Link
                href={`/profile/${post.author.username}`}
                onClick={(e) => e.stopPropagation()}
              >
                @{post.author.username}
              </Link>
            </span>
          </div>
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
          <span
            key={tag.name}
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              backgroundColor: `${tag.color}20`,
              color: tag.color,
            }}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
