"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { SearchModal } from "@/features/search/components/SearchModal";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

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
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
