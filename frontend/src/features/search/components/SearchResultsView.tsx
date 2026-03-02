"use client";

import { useState, useEffect } from "react";
import { feedService } from "@/features/feed/services/feedService";
import { PostCard } from "@/features/feed/components/Postcard";
import { useFeed } from "@/features/feed/hooks/useFeed";
import type { Post } from "@/features/feed/types/feed.types";

interface Props {
  query: string;
}

export default function SearchResultsView({ query }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleLike, handleSave, handleReport } = useFeed();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await feedService.searchPosts(query);
        if (res.ok) setPosts(res.response);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [query]);

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">
        Resultados para "{query}"
      </h1>

      {isLoading ? (
        <p className="text-sm text-neutral-400 text-center py-8">Buscando...</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-neutral-400 text-center py-8">
          No se encontraron publicaciones
        </p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => handleLike(post.id)}
            onSave={() => handleSave(post.id)}
            onReport={() => handleReport(post.id)}
          />
        ))
      )}
    </div>
  );
}
