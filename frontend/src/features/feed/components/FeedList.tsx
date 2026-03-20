"use client";
import { PostCard } from "./Postcard";
import { useFeed } from "../hooks/useFeed";
import { CreatePostForm } from "./CreatePostForm";
import { cn } from "@/lib";
import { useEffect, useState } from "react";
import { feedService } from "../services/feedService";
import { Filter } from "lucide-react";

interface AvailableTag {
  id: string;
  name: string;
  category: { name: string; color: string };
}

export function FeedList() {
  const {
    posts,
    isLoading,
    error,
    activeTab,
    activeTag,
    switchTab,
    filterByTag,
    handleLike,
    handleReport,
    handleSave,
    handleDelete,
    refetch,
  } = useFeed();

  const [tags, setTags] = useState<AvailableTag[]>([]);

  useEffect(() => {
    feedService.getTags().then((res) => {
      if (res.ok) setTags(res.response);
    });
  }, []);

  return (
    <div className="space-y-4">
      <CreatePostForm onPostCreated={refetch} />

      <div className="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
        {[
          { key: "all", label: "Para ti" },
          { key: "my-forums", label: "Mis foros" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => switchTab(tab.key as "all" | "my-forums")}
            className={cn(
              "flex-1 text-sm py-1.5 rounded-lg transition-colors font-medium",
              activeTab === tab.key
                ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tags.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => filterByTag(undefined)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-full border shrink-0 transition-colors",
              !activeTag
                ? "bg-primary text-white border-primary"
                : "border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:border-primary",
            )}
          >
            Todos
          </button>
          {tags.length > 0 && (
            <div className="relative">
              <select
                value={activeTag ?? ""}
                onChange={(e) => filterByTag(e.target.value || undefined)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                <option value="">Todas las etiquetas</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>
              <Filter
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              />
            </div>
          )}
        </div>
      )}

      {isLoading ? (
        <p className="text-sm text-neutral-400 text-center py-8">Cargando...</p>
      ) : error || !posts.length ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2">
          <p className="text-sm text-neutral-400">
            {activeTab === "my-forums"
              ? "No hay posts en tus foros — únete a algunos desde Explorar"
              : "No hay publicaciones"}
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => handleLike(post.id)}
            onSave={() => handleSave(post.id)}
            onReport={() => handleReport(post.id)}
            onDeleted={handleDelete}
          />
        ))
      )}
    </div>
  );
}
