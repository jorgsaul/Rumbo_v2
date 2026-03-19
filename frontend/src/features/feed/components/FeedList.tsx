"use client";
import { PostCard } from "./Postcard";
import { useFeed } from "../hooks/useFeed";
import { CreatePostForm } from "./CreatePostForm";
import { cn } from "@/lib";

export function FeedList() {
  const {
    posts,
    isLoading,
    error,
    activeTab,
    switchTab,
    handleLike,
    handleReport,
    handleSave,
    handleDelete,
    refetch,
  } = useFeed();

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
