"use client";

import { useState, useEffect, useCallback } from "react";
import { feedService } from "../services/feedService";
import type { Post } from "../types/feed.types";

export function useFeed(initialTag?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTag, setActiveTag] = useState<string | undefined>(initialTag);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (tag?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await feedService.getPosts(tag);
      if (res.ok) setPosts(res.response);
      else setError(res.message);
    } catch {
      setError("No se pudieron cargar los posts.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  useEffect(() => {
    fetchPosts(activeTag);
  }, [activeTag, fetchPosts]);

  const filterByTag = (tag: string | undefined) => {
    setActiveTag(tag);
  };

  const handleLike = async (postId: string) => {
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
    try {
      await feedService.likePost(postId);
    } catch {
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
    }
  };

  const handleSave = async (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p)),
    );
    try {
      await feedService.savePost(postId);
    } catch {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p)),
      );
    }
  };

  const handleReport = async (postId: string, reason?: string) => {
    try {
      await feedService.reportPost(postId, reason);
    } catch {
      // Toast en el futuro
    }
  };

  return {
    posts,
    isLoading,
    error,
    activeTag,
    filterByTag,
    handleLike,
    handleSave,
    handleReport,
    handleDelete,
    refetch: () => fetchPosts(activeTag),
  };
}
