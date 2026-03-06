import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib";

interface ProfileImageUploaderProps {
  imageUrl?: string | null;
  uploading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant: "banner" | "avatar";
  fallbackText?: string;
}

export function ProfileImageUploader({
  imageUrl,
  uploading,
  onChange,
  variant,
  fallbackText,
}: ProfileImageUploaderProps) {
  if (variant === "banner") {
    return (
      <div className="relative">
        <div className="w-full h-24 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          {imageUrl ? (
            <Image src={imageUrl} alt="Banner" fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-xs text-neutral-400">Sin banner</p>
            </div>
          )}
        </div>
        <label
          className={cn(
            "absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/50 text-white cursor-pointer hover:bg-black/70 transition-colors",
            uploading && "opacity-50 pointer-events-none",
          )}
        >
          {uploading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Camera size={14} />
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onChange}
          />
        </label>
      </div>
    );
  }

  return (
    <div className="relative w-16 min-h-6/12 mx-auto">
      <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Avatar"
            fill
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-lg font-bold text-neutral-400">{fallbackText}</p>
          </div>
        )}
      </div>
      <label
        className={cn(
          "absolute -bottom-1 -right-1 p-1 rounded-full bg-primary text-white cursor-pointer hover:bg-primary/80 transition-colors",
          uploading && "opacity-50 pointer-events-none",
        )}
      >
        {uploading ? (
          <Loader2 size={11} className="animate-spin" />
        ) : (
          <Camera size={11} />
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  );
}
