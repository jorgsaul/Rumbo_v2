"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, User } from "lucide-react";
import { profileService } from "@/features/profile/services/profileServices";

interface UserResult {
  id: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
  role: string;
}

interface SearchModalProps {
  onClose: () => void;
}

export function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<UserResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await profileService.searchUsers(query);
        if (res.ok) setUsers(res.response);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSearchPosts = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    onClose();
  };

  const handleUserClick = (username: string) => {
    router.push(`/profile/${username}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-neutral-950">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <Search size={18} className="text-neutral-400 shrink-0" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchPosts()}
          placeholder="Buscar personas o publicaciones..."
          className="flex-1 text-base bg-transparent outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400"
        />
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Resultados */}
      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <p className="text-sm text-neutral-400 text-center py-6">
            Buscando...
          </p>
        )}

        {!isLoading && users.length > 0 && (
          <div className="flex flex-col">
            <p className="text-xs text-neutral-400 px-4 pt-4 pb-2">Personas</p>
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserClick(user.username)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-left"
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-primary">
                      {user.username.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">
                    {user.fullName}
                  </span>
                  <span className="text-xs text-neutral-400">
                    @{user.username}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {!isLoading && query.trim() && (
          <button
            onClick={handleSearchPosts}
            className="flex items-center gap-3 px-4 py-3 w-full hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-left border-t border-neutral-100 dark:border-neutral-800"
          >
            <div className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
              <Search size={16} className="text-neutral-500" />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Buscar "
              <span className="font-medium text-neutral-900 dark:text-white">
                {query}
              </span>
              " en publicaciones
            </span>
          </button>
        )}

        {!isLoading && !query.trim() && (
          <div className="flex items-center justify-center h-32">
            <p className="text-sm text-neutral-400">Escribe para buscar</p>
          </div>
        )}
      </div>
    </div>
  );
}
