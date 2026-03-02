"use client";

import {
  BookOpen,
  Heart,
  Bookmark,
  MessageCircle,
  FlaskConical,
} from "lucide-react";

export const TABS = [
  { id: "posts", label: "Publicaciones", icon: BookOpen },
  { id: "comments", label: "Comentarios", icon: MessageCircle },
  { id: "likes", label: "Likes", icon: Heart },
  { id: "saved", label: "Guardados", icon: Bookmark },
  { id: "results", label: "Resultados", icon: FlaskConical },
] as const;

export type TabId = (typeof TABS)[number]["id"];

interface ProfileTabsProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

export function ProfileTabs({ activeTab, onChange }: ProfileTabsProps) {
  return (
    <div className="flex gap-1 border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto">
      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === id
              ? "border-primary text-primary"
              : "border-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
          }`}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  );
}
