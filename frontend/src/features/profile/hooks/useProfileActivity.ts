"use client";

import { useState, useEffect } from "react";
import { profileService } from "../services/profileServices";
import type { Post } from "@/features/feed/types/feed.types";
import type { PostComment } from "@/features/feed/types/feed.types";

export function useProfileActivity(userId: string, tab: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);

    const fetch = async () => {
      try {
        if (tab === "posts") {
          const res = await profileService.getUserPosts(userId);
          if (res.ok) setPosts(res.response);
        } else if (tab === "likes") {
          const res = await profileService.getUserLikes(userId);
          if (res.ok) setPosts(res.response);
        } else if (tab === "saved") {
          const res = await profileService.getUserSaved(userId);
          if (res.ok) setPosts(res.response);
        } else if (tab === "comments") {
          const res = await profileService.getUserComments(userId);
          if (res.ok) setComments(res.response);
        }
      } catch {
        setError("No se pudo cargar la actividad");
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [userId, tab]);

  return { posts, comments, isLoading, error };
}
