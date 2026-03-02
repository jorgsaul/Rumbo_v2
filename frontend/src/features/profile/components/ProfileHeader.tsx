"use client";

import Image from "next/image";
import { LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui";
import { ProfileData } from "../services/profileServices";

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

interface ProfileHeaderProps {
  profile: ProfileData;
  onEdit: () => void;
  onLogout: () => void;
}

export function ProfileHeader({
  profile,
  onEdit,
  onLogout,
}: ProfileHeaderProps) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
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

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Settings size={15} />}
              onClick={onEdit}
            >
              Editar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<LogOut size={15} />}
              onClick={onLogout}
            >
              Salir
            </Button>
          </div>
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
  );
}
