"use client";

import { useState, useEffect, useRef } from "react";
import { feedService } from "../services/feedService";
import type { Post } from "../types/feed.types";
import { Button } from "@/components/ui";
import { Tag } from "@/components/ui";
import Card from "@/components/ui/Card";
import { ChevronDown, X, ImagePlus, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib";

const TAG_VARIANTS: Record<
  string,
  "primary" | "success" | "info" | "warning" | "danger" | "neutral"
> = {
  "Mi experiencia": "success",
  Orientación: "primary",
  Recursos: "info",
  Pregunta: "warning",
};

interface AvailableTag {
  id: string;
  name: string;
  category: { name: string; color: string };
}

interface CreatePostFormProps {
  onPostCreated: (post: Post) => void;
}

const MAX_TAGS = 3;

export function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<AvailableTag[]>([]);
  const [availableTags, setAvailableTags] = useState<AvailableTag[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState<{
    url: string;
    publicId: string;
  } | null>(null);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setImageUploading(true);
    try {
      const res = await feedService.uploadImage(file);
      if (res.ok) setUploadedMedia(res.response);
    } catch {
      setError("Error al subir imagen");
      setImagePreview(null);
      setImageFile(null);
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setUploadedMedia(null);
  };

  useEffect(() => {
    feedService.getTags().then((res) => {
      if (res.ok) setAvailableTags(res.response as AvailableTag[]);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTag = (tag: AvailableTag) => {
    setSelectedTags((prev) => {
      const exists = prev.find((t) => t.id === tag.id);
      if (exists) return prev.filter((t) => t.id !== tag.id);
      if (prev.length >= MAX_TAGS) return prev;
      return [...prev, tag];
    });
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await feedService.createPost({
        title: title.trim() || undefined,
        content,
        tags: selectedTags.map((t) => t.id),
        mediaUrl: uploadedMedia?.url,
        mediaPublicId: uploadedMedia?.publicId,
      });
      if (res.ok) {
        onPostCreated(res.response);
        setContent("");
        setTitle("");
        setSelectedTags([]);
        setImagePreview(null);
        setImageFile(null);
        setUploadedMedia(null);
      } else {
        setError(res.message);
      }
    } catch {
      setError("No se pudo crear el post");
    } finally {
      setIsLoading(false);
    }
  };

  const tagsByCategory = availableTags.reduce<Record<string, AvailableTag[]>>(
    (acc, tag) => {
      const cat = tag.category.name;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(tag);
      return acc;
    },
    {},
  );

  return (
    <Card
      border="light"
      shadow="none"
      rounded="xl"
      padding="md"
      className="flex flex-col gap-3"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título (opcional)"
        className="w-full text-base font-medium bg-transparent border-none outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="¿Qué quieres compartir?"
        rows={3}
        className="w-full text-sm bg-transparent border-none outline-none resize-none text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-400"
      />

      {imagePreview && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={imagePreview}
            alt="Preview"
            fill
            className="object-cover"
          />
          {imageUploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Loader2 size={20} className="animate-spin text-white" />
            </div>
          )}
          {!imageUploading && (
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <label
          className={cn(
            "flex items-center gap-1.5 text-xs text-neutral-400 hover:text-primary transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800",
            imagePreview && "opacity-50 pointer-events-none",
          )}
        >
          <ImagePlus size={15} />
          Imagen
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
        </label>

        <Button
          size="sm"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={!content.trim() || imageUploading}
        >
          Publicar
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {selectedTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => toggleTag(tag)}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-colors"
            style={{
              backgroundColor: `${tag.category.color}20`,
              color: tag.category.color,
              borderColor: tag.category.color,
            }}
          >
            {tag.name}
            <X size={11} />
          </button>
        ))}

        {selectedTags.length < MAX_TAGS && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              + Etiqueta
              <ChevronDown
                size={12}
                className={
                  dropdownOpen
                    ? "rotate-180 transition-transform"
                    : "transition-transform"
                }
              />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg p-3 min-w-56 max-h-64 overflow-y-auto">
                {Object.entries(tagsByCategory).map(([category, tags]) => (
                  <div key={category} className="mb-3 last:mb-0">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest px-1 mb-1.5">
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => {
                        const isSelected = selectedTags.find(
                          (t) => t.id === tag.id,
                        );
                        return (
                          <button
                            key={tag.id}
                            onClick={() => toggleTag(tag)}
                            className="text-xs px-2.5 py-1 rounded-full border transition-colors"
                            style={
                              isSelected
                                ? {
                                    backgroundColor: `${tag.category.color}20`,
                                    color: tag.category.color,
                                    borderColor: tag.category.color,
                                  }
                                : {
                                    borderColor: "#e5e7eb",
                                    color: "#6b7280",
                                  }
                            }
                          >
                            {tag.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-danger">{error}</p>}
    </Card>
  );
}
