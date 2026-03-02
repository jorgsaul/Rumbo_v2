"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import {
  Rss,
  FlaskConical,
  User,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  children?: { label: string; href: string }[];
}

const baseItems: NavItem[] = [
  {
    label: "Feed",
    href: "/feed",
    icon: Rss,
  },
  {
    label: "Tests",
    icon: FlaskConical,
    href: "/tests",
  },
  {
    label: "Perfil",
    href: "/profile",
    icon: User,
  },
];

const adminItems: NavItem[] = [
  {
    label: "Administración",
    icon: ShieldCheck,
    children: [
      { label: "Tests", href: "/admin/tests" },
      { label: "Reportes", href: "/admin/reports" },
      { label: "Usuarios", href: "/admin/users" },
    ],
  },
];

export default function SideBar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (label: string) =>
    setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));

  const items =
    user?.role === "ADMIN" ? [...baseItems, ...adminItems] : baseItems;

  return (
    <aside className="h-full px-3 pt-5 flex flex-col gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isOpen = openItems[item.label];
        const isActive = item.href ? pathname === item.href : false;

        if (item.href) {
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 h-10 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800",
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        }

        return (
          <div key={item.label}>
            <button
              onClick={() => toggle(item.label)}
              className={cn(
                "w-full flex items-center gap-3 px-3 h-10 rounded-xl text-sm font-medium transition-colors",
                "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800",
              )}
            >
              <Icon size={18} />
              <span className="flex-1 text-left">{item.label}</span>
              <ChevronDown
                size={16}
                className={cn(
                  "transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            {isOpen && item.children && (
              <div className="ml-9 mt-1 flex flex-col gap-0.5">
                {item.children.map((child) => {
                  const isChildActive = pathname === child.href;
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "px-3 h-8 flex items-center rounded-lg text-sm transition-colors",
                        isChildActive
                          ? "text-primary font-medium"
                          : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800",
                      )}
                    >
                      {child.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
