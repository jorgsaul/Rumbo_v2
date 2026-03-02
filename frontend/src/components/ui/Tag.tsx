"use client";

import { cn } from "@/lib";

const VARIANT_CLASSES = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  info: "bg-info/10 text-info",
  warning: "bg-warning/10 text-warning-700",
  danger: "bg-danger/10 text-danger",
  neutral:
    "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
} as const;

interface TagProps {
  label: string;
  variant?: keyof typeof VARIANT_CLASSES;
  className?: string;
}

export function Tag({ label, variant = "neutral", className }: TagProps) {
  return (
    <span
      className={cn(
        "text-xs font-medium px-2.5 py-1 rounded-full",
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
