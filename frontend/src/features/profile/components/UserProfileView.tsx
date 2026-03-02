"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { UserPlus, UserCheck } from "lucide-react";
import { profileService } from "../services/profileServices";
import { ProfileTabs, TabId } from "./ProfileTabs";
import { ProfileActivity } from "./ProfileActivity";
import { Button } from "@/components/ui";

const ROLE_LABELS: Record<string, string> = {
  STUDENT: "Estudiante",
  AUTHOR: "Autor",
  ADMIN: "Administrador",
};

const EDUCATION_LABELS: Record<string, string> = {
  MIDDLE_SCHOOL: "Secundaria",
  HIGH_SCHOOL: "Preparatoria",
  UNIVERSITY: "Universidad",
};

interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  role: string;
  educationLevel?: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  isPrivate: boolean;
  isFollowing: boolean;
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
}

interface UserProfileViewProps {
  username: string;
}

export default function UserProfileView({ username }: UserProfileViewProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await profileService.getUserByUsername(username);
        if (res.ok) {
          setProfile(res.response);
          setIsFollowing(res.response.isFollowing);
        } else {
          setError(res.message);
        }
      } catch {
        setError("No se pudo cargar el perfil");
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [username]);

  const handleFollow = async () => {
    if (!profile) return;
    setFollowLoading(true);
    try {
      const res = await profileService.followUser(profile.id);
      if (res.ok) {
        setIsFollowing(res.response.isFollowing);
        setProfile((prev) =>
          prev
            ? {
                ...prev,
                _count: {
                  ...prev._count,
                  followers: res.response.isFollowing
                    ? prev._count.followers + 1
                    : prev._count.followers - 1,
                },
              }
            : prev,
        );
      }
    } finally {
      setFollowLoading(false);
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
          {error ?? "Usuario no encontrado"}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      {/* Header */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        {/* Banner */}
        <div className="relative w-full h-32 bg-primary/10">
          {profile.bannerUrl && (
            <Image
              src={profile.bannerUrl}
              alt="Banner"
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="px-5 pb-5 bg-white dark:bg-black-mode">
          <div className="flex items-end justify-between -mt-8 mb-3">
            <div className="w-16 h-16 rounded-full border-4 border-white dark:border-neutral-900 bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
              {profile.avatarUrl ? (
                <Image
                  src={profile.avatarUrl}
                  alt="Avatar"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-primary">
                  {profile.username.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            <Button
              size="sm"
              variant={isFollowing ? "outline" : "primary"}
              leftIcon={
                isFollowing ? <UserCheck size={15} /> : <UserPlus size={15} />
              }
              loading={followLoading}
              onClick={handleFollow}
            >
              {isFollowing ? "Siguiendo" : "Seguir"}
            </Button>
          </div>

          <div className="flex flex-col gap-0.5 mb-3">
            <h1 className="text-lg font-semibold text-neutral-900 dark:text-white leading-tight">
              {profile.fullName}
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-neutral-400">
                @{profile.username}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {ROLE_LABELS[profile.role] ?? profile.role}
              </span>
              {profile.educationLevel && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                  {EDUCATION_LABELS[profile.educationLevel] ??
                    profile.educationLevel}
                </span>
              )}
            </div>
          </div>

          {profile.bio && (
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
              {profile.bio}
            </p>
          )}

          <div className="flex gap-5">
            <div className="flex flex-col items-center">
              <span className="text-base font-semibold text-neutral-900 dark:text-white">
                {profile._count.posts}
              </span>
              <span className="text-xs text-neutral-400">Publicaciones</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-base font-semibold text-neutral-900 dark:text-white">
                {profile._count.followers}
              </span>
              <span className="text-xs text-neutral-400">Seguidores</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-base font-semibold text-neutral-900 dark:text-white">
                {profile._count.following}
              </span>
              <span className="text-xs text-neutral-400">Siguiendo</span>
            </div>
          </div>
        </div>
      </div>

      {profile.isPrivate ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-neutral-400">Este perfil es privado</p>
        </div>
      ) : (
        <>
          <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />
          <ProfileActivity userId={profile.id} activeTab={activeTab} />
        </>
      )}
    </div>
  );
}
