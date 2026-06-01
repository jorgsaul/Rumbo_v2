"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "../hooks/useProfile";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileTabs, TabId, TABS } from "./ProfileTabs";
import { ProfileActivity } from "./ProfileActivity";
import { Button } from "@/components/ui";
import Cookies from "js-cookie";
import ChatFAQ from "@/features/support/components/ChatFAQ";
import MyTickets from "@/features/support/components/MyTickets";
import { ticketService } from "@/features/support/services/ticketService";

export default function ProfileView() {
  const { profile, isLoading, error, retry } = useProfile();
  const { logout } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("posts");
  const [hasTickets, setHasTickets] = useState(false);

  useEffect(() => {
    ticketService.getMyTickets().then((tickets) => {
      setHasTickets(tickets.length > 0);
    }).catch(() => {});
  }, []);

  const visibleTabs = TABS.filter(
    (t) => t.id !== "tickets" || hasTickets
  );

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      logout();
      Cookies.remove("auth-client");
      router.push("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-neutral-400 text-sm">Cargando perfil...</p>
      </div>
    );
  }

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <p className="text-sm text-neutral-400">No se pudo conectar</p>
        <Button variant="ghost" size="sm" onClick={retry}>
          Reintentar
        </Button>
      </div>
    );

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-danger text-sm">
          {error ?? "No se pudo cargar el perfil"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        <ProfileHeader
          profile={profile}
          onEdit={() => router.push("/profile/settings")}
          onLogout={handleLogout}
        />
        <ProfileTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={visibleTabs}
        />
        {activeTab === "tickets" ? (
          <MyTickets />
        ) : (
          <ProfileActivity userId={profile.id} activeTab={activeTab} />
        )}
      </div>
      <ChatFAQ />
    </>
  );
}