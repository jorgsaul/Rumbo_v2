"use client";

import AtlasChat from "@/features/atlas/componentes/AtlasChat";

export default function AtlasPage() {
  return (
    <div className="h-[calc(100vh-64px)]">
      <AtlasChat userId="test-user-id" />
    </div>
  );
}