import { DraftOption } from "../../types/admin.types";
import { cn } from "@/lib";
import { Check } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function OptionsEditor({
  options,
  onChange,
}: {
  options: DraftOption[];
  onChange: (opts: DraftOption[]) => void;
}) {
  const setCorrect = (idx: number) => {
    onChange(options.map((o, i) => ({ ...o, isCorrect: i === idx })));
  };

  const updateText = (idx: number, text: string) => {
    onChange(options.map((o, i) => (i === idx ? { ...o, text } : o)));
  };

  const updateImage = (idx: number, imageUrl: string | null) => {
    onChange(options.map((o, i) => (i === idx ? { ...o, imageUrl } : o)));
  };

  return (
    <div className="space-y-2">
      {options.map((opt, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCorrect(idx)}
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border-2 transition-colors",
                opt.isCorrect
                  ? "bg-success border-success text-white"
                  : "border-neutral-200 dark:border-neutral-700 text-neutral-400 hover:border-success",
              )}
            >
              {opt.isCorrect ? (
                <Check size={13} />
              ) : (
                <span className="text-xs font-bold">{opt.label}</span>
              )}
            </button>
            <input
              value={opt.text}
              onChange={(e) => updateText(idx, e.target.value)}
              placeholder={`Opción ${opt.label}`}
              className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="pl-9">
            <ImageUploader
              imageUrl={opt.imageUrl}
              folder="options"
              onUpload={(url) => updateImage(idx, url)}
              onRemove={() => updateImage(idx, null)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
