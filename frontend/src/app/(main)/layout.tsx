"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import Header from "@/components/layouts/Header";
import SideBar from "@/components/layouts/SideBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Header onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

      <div className="flex pt-16">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={cn(
            "fixed top-16 left-0 h-[calc(100vh-4rem)] z-30 overflow-y-auto",
            "w-64 transition-transform duration-300",
            "bg-neutral-50 dark:bg-neutral-900",
            "border-r border-neutral-200 dark:border-neutral-800",
            !sidebarOpen && "-translate-x-full",
            sidebarOpen && "translate-x-0",
            "md:translate-x-0 md:sticky md:top-16 md:h-[calc(100vh-4rem)]",
          )}
        >
          <SideBar />
        </aside>

        <main className="flex-1 p-6 min-w-0">{children}</main>
      </div>
    </div>
  );
}
