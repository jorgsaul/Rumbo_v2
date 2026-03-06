"use client";

import { cn } from "@/lib";

interface IconButtonProps {
  icon: React.ElementType;
  label?: string;
  onClick?: () => void;
  active?: boolean;
  count?: number;
  disabled?: boolean;
  className?: string;
  activeClassName?: string;
  iconSize?: number;
}

export function IconButton({
  icon: Icon,
  label,
  onClick,
  active = false,
  count,
  disabled = false,
  className,
  iconSize = 20,
  activeClassName = "text-primary",
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center gap-1.5 transition-colors duration-150",
        "hover:cursor-pointer",
        "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        active && activeClassName,
        className,
      )}
    >
      <Icon
        size={iconSize}
        fill={active ? "currentColor" : "none"}
        className="transition-transform duration-150 hover:scale-110"
      />
      {count !== undefined && <span className="text-xs">{count}</span>}
    </button>
  );
}
