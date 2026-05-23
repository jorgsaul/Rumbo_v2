"use client";

import AtlasChat from "@/features/atlas/componentes/AtlasChat";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AtlasPage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    useAuthStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user) return null;

  return (
    <div className="h-[calc(100vh-64px)]">
      <AtlasChat userId={user.id} />
    </div>
  );
}