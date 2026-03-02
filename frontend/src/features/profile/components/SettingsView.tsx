"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "../hooks/useProfile";
import { profileService } from "../services/profileServices";
import { useTheme } from "@/hooks/useTheme";
import { Button, Input } from "@/components/ui";
import Card from "@/components/ui/Card";
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
        <button
          onClick={() => router.back()}
          className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
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
        className="flex flex-col gap-3"
      >
        <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Privacidad
        </h2>

        <button
          onClick={() => setIsPrivate((prev) => !prev)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-3">
            {isPrivate ? (
              <Lock size={18} className="text-primary" />
            ) : (
              <Unlock size={18} className="text-neutral-400" />
            )}
            <div className="text-left">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {isPrivate ? "Perfil privado" : "Perfil público"}
              </p>
              <p className="text-xs text-neutral-400">
                {isPrivate
                  ? "Solo tus seguidores pueden ver tu actividad"
                  : "Cualquiera puede ver tu actividad"}
              </p>
            </div>
          </div>

          <div
            className={`w-10 h-6 rounded-full transition-colors relative ${
              isPrivate ? "bg-primary" : "bg-neutral-300 dark:bg-neutral-600"
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                isPrivate ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </div>
        </button>
      </Card>

      <Card
        border="light"
        shadow="none"
        rounded="xl"
        padding="md"
        className="flex flex-col gap-3"
      >
        <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Apariencia
        </h2>

        <button
          onClick={toggleTheme}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-3">
            {isDark ? (
              <Moon size={18} className="text-primary" />
            ) : (
              <Sun size={18} className="text-neutral-400" />
            )}
            <div className="text-left">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {isDark ? "Modo oscuro" : "Modo claro"}
              </p>
              <p className="text-xs text-neutral-400">
                Cambia el tema de la aplicación
              </p>
            </div>
          </div>

          <div
            className={`w-10 h-6 rounded-full transition-colors relative ${
              isDark ? "bg-primary" : "bg-neutral-300 dark:bg-neutral-600"
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                isDark ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </div>
        </button>
      </Card>

      {saveError && (
        <p className="text-sm text-danger text-center">{saveError}</p>
      )}
      {saved && (
        <p className="text-sm text-success text-center">Cambios guardados</p>
      )}

      <Button fullWidth onClick={handleSave} loading={isSaving}>
        Guardar cambios
      </Button>
    </div>
  );
}
