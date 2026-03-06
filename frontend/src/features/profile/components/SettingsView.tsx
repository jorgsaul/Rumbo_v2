"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "../hooks/useProfile";
import { profileService } from "../services/profileServices";
import { useTheme } from "@/hooks/useTheme";
import {
  Button,
  Input,
  Card,
  ToggleSwitch,
  ProfileImageUploader,
  IconButton,
} from "@/components/ui";
import { ArrowLeft, Moon, Sun, Lock, Unlock } from "lucide-react";

export default function SettingsView() {
  const { profile, isLoading, error } = useProfile();
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    try {
      const res = await profileService.updateAvatar(file);
      if (res.ok) {
        profile!.avatarUrl = res.response.avatarUrl;
      }
    } catch {
      setSaveError("Error al subir avatar");
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerUploading(true);
    try {
      const res = await profileService.updateBanner(file);
      if (res.ok) {
        profile!.bannerUrl = res.response.bannerUrl;
      }
    } catch {
      setSaveError("Error al subir banner");
    } finally {
      setBannerUploading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName);
      setBio(profile.bio ?? "");
      setIsPrivate(profile.isPrivate);
    }
  }, [profile]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaved(false);
    try {
      const res = await profileService.updateMe({ fullName, bio, isPrivate });
      if (res.ok) setSaved(true);
      else setSaveError(res.message);
    } catch {
      setSaveError("No se pudo guardar");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-neutral-400 text-sm">Cargando...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-danger text-sm">{error ?? "Error al cargar"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <IconButton onClick={() => router.back()} icon={ArrowLeft} />
        <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Configuración
        </h1>
      </div>
      <Card
        border="light"
        shadow="none"
        rounded="xl"
        padding="md"
        className="flex flex-col gap-4"
      >
        <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Fotos de perfil
        </h2>

        <ProfileImageUploader
          imageUrl={profile.bannerUrl}
          uploading={bannerUploading}
          onChange={handleBannerChange}
          variant="banner"
        />

        <ProfileImageUploader
          imageUrl={profile.avatarUrl}
          uploading={avatarUploading}
          onChange={handleAvatarChange}
          variant="avatar"
        />
      </Card>
      <Card
        border="light"
        shadow="none"
        rounded="xl"
        padding="md"
        className="flex flex-col gap-4"
      >
        <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Información del perfil
        </h2>

        <div className="flex flex-col gap-0.5">
          <p className="text-xs text-neutral-400">Usuario</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 rounded-lg">
            @{profile.username}
          </p>
        </div>

        <Input
          title="Nombre completo"
          label="Tu nombre"
          inputSize="md"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <p className="text-sm opacity-95">Biografía</p>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Cuéntanos sobre ti..."
            rows={3}
            maxLength={200}
            className="w-full px-3 py-2 text-sm rounded-lg border-2 border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 focus:outline-none focus:border-primary transition-colors resize-none"
          />
          <p className="text-xs text-neutral-400 text-right">
            {bio.length}/200
          </p>
        </div>
      </Card>
      <Card
        border="light"
        shadow="none"
        rounded="xl"
        padding="md"
        className="flex flex-col gap-4"
      >
        <ToggleSwitch
          active={isPrivate}
          onClick={() => setIsPrivate((p) => !p)}
          icon={
            isPrivate ? (
              <Lock size={18} className="text-primary" />
            ) : (
              <Unlock size={18} className="text-neutral-400" />
            )
          }
          label={isPrivate ? "Perfil privado" : "Perfil público"}
          description={
            isPrivate
              ? "Solo tus seguidores pueden ver tu actividad"
              : "Cualquiera puede ver tu actividad"
          }
        />

        <ToggleSwitch
          active={isDark}
          onClick={toggleTheme}
          icon={
            isDark ? (
              <Moon size={18} className="text-primary" />
            ) : (
              <Sun size={18} className="text-neutral-400" />
            )
          }
          label={isDark ? "Modo oscuro" : "Modo claro"}
          description="Cambia el tema de la aplicación"
        />
        {saveError && (
          <p className="text-sm text-danger text-center">{saveError}</p>
        )}
        {saved && (
          <p className="text-sm text-success text-center">Cambios guardados</p>
        )}
      </Card>

      <Button fullWidth onClick={handleSave} loading={isSaving}>
        Guardar cambios
      </Button>
    </div>
  );
}
