"use client";

import { useState, useEffect } from "react";
import { forumService, Forum } from "../services/forumService";
import { feedService } from "@/features/feed/services/feedService";
import type { Post } from "@/features/feed/types/feed.types";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, MessageSquare, Plus, Check } from "lucide-react";
import { PostCard } from "@/features/feed/components/Postcard";
import { CreatePostForm } from "@/features/feed/components/CreatePostForm";
import Button from "@/components/ui/Button";
import Image from "next/image";

interface ForumDetailPageProps {
  forumId: string;
}

export default function ForumDetailPage({ forumId }: ForumDetailPageProps) {
  const [forum, setForum] = useState<Forum | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [joiningForum, setJoiningForum] = useState(false);
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

  const handleJoin = async () => {
    setJoiningForum(true);
    try {
      const res = await forumService.joinForum(forumId);
      setForum((prev) =>
        prev
          ? {
              ...prev,
              isMember: res.isMember,
              _count: {
                ...prev._count,
                members: prev._count.members + (res.isMember ? 1 : -1),
              },
            }
          : prev,
      );
    } finally {
      setJoiningForum(false);
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

  if (error || !forum) {
    return (
      <p className="text-sm text-danger text-center py-8">
        {error ?? "Foro no encontrado"}
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-primary/10">
        {forum.bannerUrl ? (
          <Image src={forum.bannerUrl} alt="" fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5" />
        )}
      </div>

      <div className="flex items-end justify-between gap-3 px-1">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-2xl border-4 border-white dark:border-neutral-950 bg-primary/10 overflow-hidden shrink-0 -mt-8">
            {forum.imageUrl ? (
              <Image
                src={forum.imageUrl}
                alt=""
                width={56}
                height={56}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <MessageSquare size={22} className="text-primary" />
              </div>
            )}
          </div>
          <div className="pt-2">
            <h1 className="text-lg font-bold text-neutral-900 dark:text-white">
              {forum.name}
            </h1>
            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span>{forum._count.posts} posts</span>
              <span>{forum._count.members} miembros</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant={forum.isMember ? "ghost" : "primary"}
            size="sm"
            onClick={handleJoin}
            loading={joiningForum}
            leftIcon={forum.isMember ? <Check size={13} /> : undefined}
          >
            {forum.isMember ? "Unido" : "Unirse"}
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus size={15} />}
            onClick={() => setShowForm((prev) => !prev)}
          >
            Publicar
          </Button>
        </div>
      </div>

      {forum.description && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 px-1">
          {forum.description}
        </p>
      )}

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
