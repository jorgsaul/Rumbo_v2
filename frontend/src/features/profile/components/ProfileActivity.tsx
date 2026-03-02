"use client";

import { useState, useEffect } from "react";
import { TabId } from "./ProfileTabs";
import { useProfileActivity } from "../hooks/useProfileActivity";
import { useFeed } from "@/features/feed/hooks/useFeed";
import { PostCard } from "@/features/feed/components/Postcard";
import { Card } from "@/components/ui";
import { formatDate } from "@/utils/FormatDate";
import type { Post } from "@/features/feed/types/feed.types";
import { ProfileResults } from "./ProfileResutls";

interface ProfileActivityProps {
  userId: string;
  activeTab: TabId;
}

export function ProfileActivity({ userId, activeTab }: ProfileActivityProps) {
  const {
    posts: activityPosts,
    comments,
    isLoading,
    error,
  } = useProfileActivity(userId, activeTab);
  const {
    handleLike: feedLike,
    handleSave: feedSave,
    handleReport: feedReport,
  } = useFeed();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(activityPosts);
  }, [activityPosts]);

  const handleLike = (postId: string) => {
    feedLike(postId);
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    );
  };

  const handleSave = (postId: string) => {
    feedSave(postId);
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p)),
    );
  };

  if (isLoading) {
    return (
      <p className="text-sm text-neutral-400 text-center py-8">Cargando...</p>
    );
  }

  if (error) {
    return <p className="text-sm text-danger text-center py-8">{error}</p>;
  }

  if (activeTab === "results") {
    return <ProfileResults userId={userId} />;
  }

  if (activeTab === "comments") {
    if (comments.length === 0) {
      return (
        <p className="text-sm text-neutral-400 text-center py-8">
          Aún no has comentado
        </p>
      );
    }
    return (
      <div className="flex flex-col gap-3">
        {comments.map((comment) => (
          <Card
            key={comment.id}
            border="light"
            shadow="none"
            rounded="xl"
            padding="sm"
          >
            <p className="text-xs text-neutral-400 mb-1">
              En:{" "}
              {comment.post?.title ??
                comment.post?.content.slice(0, 50) + "..."}
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {comment.content}
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              {formatDate(comment.createdAt)}
            </p>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <p className="text-sm text-neutral-400 text-center py-8">
        {activeTab === "posts" && "Aún no has publicado nada"}
        {activeTab === "likes" && "Aún no has dado likes"}
        {activeTab === "saved" && "Aún no has guardado nada"}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={() => handleLike(post.id)}
          onSave={() => handleSave(post.id)}
          onReport={() => feedReport(post.id)}
          onDeleted={(id) =>
            setPosts((prev) => prev.filter((p) => p.id !== id))
          }
        />
      ))}
    </div>
  );
}
