"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { ChevronDown, ChevronRight } from "lucide-react";
import { iconSizes } from "@/config/sizes";

export interface MenuItemData {
  label: string;
  href?: string;
  icon?: React.ElementType;
  items?: MenuItemData[];
}

interface MenuItemProps extends MenuItemData {
  size?: keyof typeof iconSizes;
  isOpen?: boolean;
  onClick?: () => void;
}

const SIZE_CLASSES = {
  xs: { parent: "text-xs h-8", leaf: "text-xs h-6" },
  sm: { parent: "text-sm h-9", leaf: "text-sm h-7" },
  md: { parent: "text-base h-10", leaf: "text-base h-8" },
  lg: { parent: "text-lg h-11", leaf: "text-lg h-9" },
  xl: { parent: "text-xl h-12", leaf: "text-xl h-10" },
} as const;

export default function MenuItem({
  icon: Icon,
  size = "md",
  label,
  href,
  onClick,
  isOpen = false,
  items,
}: MenuItemProps) {
  const isParent = !!items?.length;
  const sizeClass = isParent
    ? SIZE_CLASSES[size].parent
    : SIZE_CLASSES[size].leaf;

  const baseClass = cn(
    "w-full rounded-xl cursor-pointer flex items-center gap-2 px-3",
    "hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
    sizeClass,
  );

  if (href) {
    return (
      <Link href={href} className={cn(baseClass, "pl-9 font-light")}>
        {label}
      </Link>
    );
  }

  return (
    <button className={baseClass} onClick={onClick}>
      {Icon && <Icon size={iconSizes[size]} className="shrink-0" />}
      <span className="flex-1 text-left">{label}</span>
      {isParent &&
        (isOpen ? (
          <ChevronDown size={iconSizes[size]} className="shrink-0" />
        ) : (
          <ChevronRight size={iconSizes[size]} className="shrink-0" />
        ))}
    </button>
  );
}
