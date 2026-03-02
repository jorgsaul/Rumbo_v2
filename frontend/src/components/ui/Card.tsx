"use client";

import { cn } from "@/lib/utils/cn";

const PADDING_CLASSES = {
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
} as const;

const ROUNDED_CLASSES = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
  pill: "rounded-pill",
} as const;

const BORDER_CLASSES = {
  none: "border-0",
  light: "border border-gray-200 dark:border-[#1c1c1c]",
  medium: "border-2 border-gray-300 dark:border-[#1c1c1c]",
  heavy: "border-4 border-gray-400 dark:border-[#1c1c1c]",
  primary: "border border-primary/30",
  danger: "border border-danger/30",
} as const;

const CLICKABLE_CLASSES = {
  none: "",
  default: "cursor-pointer hover:shadow-md transition-shadow",
  lift: "cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all",
  scale: "cursor-pointer hover:scale-105 transition-transform",
} as const;

interface CardProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  padding?: keyof typeof PADDING_CLASSES;
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "glow" | "floating";
  rounded?: keyof typeof ROUNDED_CLASSES;
  border?: keyof typeof BORDER_CLASSES;
  clickable?: keyof typeof CLICKABLE_CLASSES;
  disableDarkMode?: boolean;
}

export default function Card({
  children,
  padding = "md",
  shadow = "floating",
  rounded = "xl",
  border = "light",
  clickable = "none",
  disableDarkMode = false,
  className,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white",
        !disableDarkMode && "dark:bg-black-mode",
        PADDING_CLASSES[padding],
        ROUNDED_CLASSES[rounded],
        BORDER_CLASSES[border],
        {
          "shadow-none": shadow === "none",
          "shadow-sm": shadow === "sm",
          "shadow-md": shadow === "md",
          "shadow-lg": shadow === "lg",
          "shadow-xl": shadow === "xl",
          "shadow-glow": shadow === "glow",
          "shadow-floating": shadow === "floating",
        },
        CLICKABLE_CLASSES[clickable],
        className,
      )}
    >
      {children}
    </div>
  );
}
