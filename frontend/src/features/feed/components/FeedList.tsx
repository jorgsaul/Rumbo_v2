"use client";
import { PostCard } from "./Postcard";
import { useFeed } from "../hooks/useFeed";
import { CreatePostForm } from "./CreatePostForm";

export function FeedList() {
  const {
    posts,
    isLoading,
    error,
    handleLike,
    handleReport,
    handleSave,
    refetch,
  } = useFeed();

  return (
    <>
      <CreatePostForm onPostCreated={refetch} />
      {isLoading
        ? "Cargando..."
        : error || !posts.length
          ? "No hay posts"
          : posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={() => handleLike(post.id)}
                onSave={() => handleSave(post.id)}
                onReport={() => handleReport(post.id)}
                onDeleted={refetch}
              />
            ))}
    </>
  );
}
