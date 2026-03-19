"use client";

import { MenuIcon, Search, Bell } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { SearchModal } from "@/features/search/components/SearchModal";
import NotificationPanel from "@/features/notifications/components/NotificationPanel";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="h-16 w-full fixed top-0 left-0 z-50 bg-primary flex items-center px-4 gap-4">
        <button
          onClick={onMenuToggle}
          className="text-white hover:opacity-80 transition-opacity"
        >
          <MenuIcon size={22} />
        </button>

        <Link href="/">
          <img src="/Logo-blanco.png" alt="Rumbo" width={50} height={50} />
        </Link>

        <div className="flex-1" />

        <button
          onClick={() => setSearchOpen(true)}
          className="text-white hover:opacity-80 transition-opacity"
        >
          <Search size={20} />
        </button>

        <button
          onClick={() => setNotifOpen((prev) => !prev)}
          className="relative text-white hover:opacity-80 transition-opacity"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {notifOpen && (
          <NotificationPanel
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
            onClose={() => setNotifOpen(false)}
          />
        )}
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
