"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { forumService, Forum } from "../services/forumService";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib";

export default function ForumEditPage({ forumId }: { forumId: string }) {
  const [forum, setForum] = useState<Forum | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<
    "image" | "banner" | null
  >(null);
  const router = useRouter();
  const { addToast } = useToast();

  useEffect(() => {
    forumService
      .getForumById(forumId)
      .then((f) => {
        setForum(f);
        setName(f.name);
        setDescription(f.description ?? "");
      })
      .finally(() => setIsLoading(false));
  }, [forumId]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updated = await forumService.updateForum(forumId, {
        name,
        description,
      });
      setForum((prev) => (prev ? { ...prev, ...updated } : prev));
      addToast({
        title: "Foro actualizado",
        category: "success",
        description: "El foro se a actualizado exitosamente.",
      });
      router.push(`/foros/${forumId}`);
    } catch {
      addToast({
        title: "Error al guardar",
        category: "danger",
        description: "Ha ocurrido un error intentando guardar el foro.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "banner",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(type);
    try {
      const updated = await forumService.updateForumImage(forumId, file, type);
      setForum((prev) => (prev ? { ...prev, ...updated } : prev));
      addToast({
        title: "Imagen actualizada",
        category: "success",
        description: "Se ha actualizado correctamente",
      });
    } catch {
      addToast({
        title: "Error al subir imagen",
        category: "danger",
        description: "Error en la subida de imagen, prueba mas tarde.",
      });
    } finally {
      setUploadingImage(null);
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

  if (!forum) return null;

  return (
    <div className="max-w-lg mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-lg font-bold text-neutral-900 dark:text-white">
          Editar foro
        </h1>
      </div>

      {/* Banner */}
      <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-primary/10">
        {forum.bannerUrl ? (
          <Image src={forum.bannerUrl} alt="" fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5" />
        )}
        <label
          className={cn(
            "absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/50 text-white cursor-pointer hover:bg-black/70 transition-colors",
            uploadingImage === "banner" && "opacity-50 pointer-events-none",
          )}
        >
          {uploadingImage === "banner" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Camera size={14} />
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, "banner")}
          />
        </label>

        <div className="absolute -bottom-5 left-4 w-14 h-14 rounded-2xl border-4 border-white dark:border-neutral-950 bg-primary/10 overflow-hidden">
          {forum.imageUrl ? (
            <Image src={forum.imageUrl} alt="" fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-primary/10" />
          )}
          <label
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/40 text-white cursor-pointer hover:bg-black/60 transition-colors",
              uploadingImage === "image" && "opacity-50 pointer-events-none",
            )}
          >
            {uploadingImage === "image" ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Camera size={12} />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, "image")}
            />
          </label>
        </div>
      </div>

      <div className="pt-4 space-y-4">
        <Card
          padding="md"
          rounded="xl"
          border="light"
          shadow="sm"
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Nombre
            </p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Descripción
            </p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={200}
              className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors resize-none"
            />
          </div>
        </Card>

        <Button
          variant="primary"
          fullWidth
          onClick={handleSave}
          loading={isSaving}
        >
          Guardar cambios
        </Button>
      </div>
    </div>
  );
}
