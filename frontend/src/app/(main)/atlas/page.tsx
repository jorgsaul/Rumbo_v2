"use client";

import AtlasChat from "@/features/atlas/componentes/AtlasChat";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

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

  if (!user.isActive) {
    return (
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-3">
        <AlertCircle className="text-red-500" size={32} />
        <p className="text-sm text-neutral-500">
          No se pudo cargar Atlas. Intenta de nuevo.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]">
      <div className="w-full flex flex-col">
        <AtlasChat userId={user.id} />
      </div>
    </div>
  );
}