import { useState } from "react";
import { adminService } from "../../services/adminService";
import { X, Loader2, ImagePlus } from "lucide-react";
import { cn } from "@/lib";

export default function ImageUploader({
  imageUrl,
  onUpload,
  onRemove,
  folder,
}: {
  imageUrl?: string | null;
  onUpload: (url: string) => void;
  onRemove: () => void;
  folder: "questions" | "options";
}) {
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await adminService.uploadTestImage(file, folder);
      onUpload(result.url);
    } catch {
      // manejar error
    } finally {
      setUploading(false);
    }
  };

  if (imageUrl) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
        <img src={imageUrl} alt="" className="w-full h-full object-contain" />
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70"
        >
          <X size={13} />
        </button>
      </div>
    );
  }

  return (
    <label
      className={cn(
        "flex items-center gap-1.5 text-xs text-neutral-400 hover:text-primary cursor-pointer px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
        uploading && "opacity-50 pointer-events-none",
      )}
    >
      {uploading ? (
        <Loader2 size={13} className="animate-spin" />
      ) : (
        <ImagePlus size={13} />
      )}
      {uploading ? "Subiendo..." : "Agregar imagen"}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </label>
  );
}
