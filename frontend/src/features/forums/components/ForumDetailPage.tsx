"use client";

import { useState, useEffect } from "react";
import { forumService, Forum } from "../services/forumService";
import { feedService } from "@/features/feed/services/feedService";
import type { Post } from "@/features/feed/types/feed.types";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, MessageSquare, Plus } from "lucide-react";
import { PostCard } from "@/features/feed/components/Postcard";
import { CreatePostForm } from "@/features/feed/components/CreatePostForm";
import Button from "@/components/ui/Button";

interface ForumDetailPageProps {
  forumId: string;
}

export default function ForumDetailPage({ forumId }: ForumDetailPageProps) {
  const [forum, setForum] = useState<Forum | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const [forumData, postsData] = await Promise.all([
          forumService.getForumById(forumId),
          forumService.getForumPosts(forumId),
        ]);
        setForum(forumData);
        setPosts(postsData);
      } catch {
        setError("Error cargando el foro");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [forumId]);

  const handlePostCreated = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
    setShowForm(false);
  };

  const handlePostDeleted = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const handleLike = async (postId: string) => {
    try {
      const res = await feedService.likePost(postId);
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  isLiked: res.response.isLiked,
                  likes: p.likes + (res.response.isLiked ? 1 : -1),
                }
              : p,
          ),
        );
      }
    } catch {}
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 gap-3">
        <Loader2 size={20} className="animate-spin text-primary" />
        <span className="text-sm text-neutral-400">Cargando...</span>
      </div>
    );
  }

  if (error || !forum) {
    return (
      <p className="text-sm text-danger text-center py-8">
        {error ?? "Foro no encontrado"}
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight truncate">
            {forum.name}
          </h1>
          {forum.description && (
            <p className="text-xs text-neutral-400 mt-0.5">
              {forum.description}
            </p>
          )}
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus size={15} />}
          onClick={() => setShowForm((prev) => !prev)}
        >
          Publicar
        </Button>
      </div>

      <div className="flex items-center gap-2 text-xs text-neutral-400">
        <MessageSquare size={13} />
        <span>{forum._count.posts} publicaciones</span>
      </div>

      {showForm && (
        <CreatePostForm onPostCreated={handlePostCreated} forumId={forumId} />
      )}

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <MessageSquare size={24} className="text-primary" />
          </div>
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Sin publicaciones
          </p>
          <p className="text-xs text-neutral-400">Sé el primero en publicar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              onDeleted={handlePostDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}
