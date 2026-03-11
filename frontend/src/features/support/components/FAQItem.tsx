"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib";

export default function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button onClick={() => setOpen(!open)} className="w-full text-left">
      <div className="flex items-start justify-between gap-3 py-3">
        <p
          className={cn(
            "text-sm font-medium transition-colors",
            open ? "text-primary" : "text-neutral-800 dark:text-neutral-100",
          )}
        >
          {q}
        </p>
        <span className="shrink-0 mt-0.5 text-neutral-400">
          {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </span>
      </div>
      {open && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed pb-3">
          {a}
        </p>
      )}
      <div className="h-px bg-neutral-100 dark:bg-neutral-800" />
    </button>
  );
}
