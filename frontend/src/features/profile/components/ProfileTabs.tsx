"use client";

import {
  BookOpen,
  Heart,
  Bookmark,
  MessageCircle,
  FlaskConical,
  TicketCheck,
} from "lucide-react";

export const TABS = [
  { id: "posts", label: "Publicaciones", icon: BookOpen },
  { id: "comments", label: "Comentarios", icon: MessageCircle },
  { id: "likes", label: "Likes", icon: Heart },
  { id: "saved", label: "Guardados", icon: Bookmark },
  { id: "results", label: "Resultados", icon: FlaskConical },
  { id: "tickets", label: "Tickets", icon: TicketCheck },
] as const;

export type TabId = (typeof TABS)[number]["id"];

type Tab = (typeof TABS)[number];

interface ProfileTabsProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
  tabs?: readonly Tab[];
}

export function ProfileTabs({ activeTab, onChange, tabs = TABS }: ProfileTabsProps) {
  return (
    <div className="flex gap-0 bg-neutral-100 dark:bg-neutral-900 rounded-xl p-1 w-fit max-w-full overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-all whitespace-nowrap ${
            activeTab === id
              ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 shadow-sm"
              : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
          }`}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  );
}