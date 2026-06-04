"use client";
import { PostCard } from "./Postcard";
import { useFeed } from "../hooks/useFeed";
import { CreatePostForm } from "./CreatePostForm";
import { cn } from "@/lib";
import { useEffect, useRef, useState } from "react";
import { feedService } from "../services/feedService";
import { Tag, ChevronDown } from "lucide-react";

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
  const [ddOpen, setDdOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feedService.getTags().then((res) => {
      if (res.ok) setTags(res.response);
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
        setDdOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = activeTag
    ? tags.find((t) => t.name === activeTag)?.name
    : null;

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
        <div className="flex items-center gap-2">
          <button
            onClick={() => filterByTag(undefined)}
            className={cn(
              "flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full border shrink-0 transition-all font-medium",
              !activeTag
                ? "bg-primary text-white border-primary"
                : "border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary",
            )}
          >
            Todos
          </button>

          <div className="relative" ref={ddRef}>
            <button
              onClick={() => setDdOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full border transition-all font-medium",
                activeTag
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:border-neutral-400 dark:hover:border-neutral-500",
              )}
            >
              <Tag size={12} />
              <span>{selectedLabel ?? "Todas las etiquetas"}</span>
              <ChevronDown
                size={12}
                className={cn(
                  "transition-transform duration-200",
                  ddOpen && "rotate-180",
                )}
              />
            </button>

            {ddOpen && (
              <div className="absolute top-[calc(100%+6px)] left-0 z-50 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl py-1 min-w-[200px] max-h-64 overflow-y-auto shadow-sm">
                <button
                  onClick={() => {
                    filterByTag(undefined);
                    setDdOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 text-xs text-left transition-colors",
                    !activeTag
                      ? "text-primary font-medium bg-primary/5"
                      : "text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white",
                  )}
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full shrink-0",
                      !activeTag ? "bg-primary" : "bg-neutral-300 dark:bg-neutral-600",
                    )}
                  />
                  Todas las etiquetas
                </button>

                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => {
                      filterByTag(tag.name);
                      setDdOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 w-full px-3 py-2 text-xs text-left transition-colors",
                      activeTag === tag.name
                        ? "text-primary font-medium bg-primary/5"
                        : "text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full shrink-0",
                        activeTag === tag.name
                          ? "bg-primary"
                          : "bg-neutral-300 dark:bg-neutral-600",
                      )}
                    />
                    {tag.name}
                  </button>
                ))}
              </div>
            )}
          </div>
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