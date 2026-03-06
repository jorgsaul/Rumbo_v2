"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "../hooks/useProfile";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileTabs, TabId } from "./ProfileTabs";
import { ProfileActivity } from "./ProfileActivity";
import Cookies from "js-cookie";

export default function ProfileView() {
  const { profile, isLoading, error } = useProfile();
  const { logout } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("posts");

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

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-danger text-sm">
          {error ?? "No se pudo cargar el perfil"}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      <ProfileHeader
        profile={profile}
        onEdit={() => router.push("/profile/settings")}
        onLogout={handleLogout}
      />

      <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

      <ProfileActivity userId={profile.id} activeTab={activeTab} />
    </div>
  );
}
