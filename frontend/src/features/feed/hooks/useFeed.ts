"use client";

import { useState, useEffect, useCallback } from "react";
import { feedService } from "../services/feedService";
import type { Post } from "../types/feed.types";
import { useToast } from "@/context/ToastContext";

export function useFeed(initialTag?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTag, setActiveTag] = useState<string | undefined>(initialTag);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "my-forums">("all");
  const { addToast } = useToast();

  const fetchPosts = useCallback(
    async (tab: "all" | "my-forums", tag?: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const res =
          tab === "my-forums"
            ? await feedService.getPersonalizedFeed(tag)
            : await feedService.getPosts(tag);
        if (res.ok) setPosts(res.response);
        else setError(res.message);
      } catch {
        setError("No se pudieron cargar los posts.");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchPosts(activeTab, activeTag);
  }, [activeTab, activeTag, fetchPosts]);

  const switchTab = (tab: "all" | "my-forums") => {
    setActiveTab(tab);
  };

  const handleDelete = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

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

  const handleReport = async (postId: string) => {
    try {
      await feedService.reportPost(postId);
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, isReported: true } : p)),
      );
      addToast({
        title: "Reporte enviado",
        description: "Gracias por ayudar a mantener la comunidad segura",
        category: "success",
      });
    } catch (error: any) {
      if (error.response?.status === 409) {
        addToast({
          title: "Ya reportaste esta publicación",
          description: "Solo puedes reportar una publicación una vez",
          category: "warning",
        });
      } else {
        addToast({
          title: "Error al reportar",
          description: "Intenta de nuevo más tarde",
          category: "danger",
        });
      }
    }
  };

  return {
    posts,
    isLoading,
    error,
    activeTag,
    activeTab,
    switchTab,
    filterByTag,
    handleLike,
    handleSave,
    handleReport,
    handleDelete,
    refetch: () => fetchPosts(activeTab, activeTag),
  };
}
