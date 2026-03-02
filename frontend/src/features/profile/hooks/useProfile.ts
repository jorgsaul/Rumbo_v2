"use client";

import { useState, useEffect } from "react";
import { profileService, ProfileData } from "../services/profileServices";

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await profileService.getMe();
        if (res.ok) setProfile(res.response);
        else setError(res.message);
      } catch {
        setError("No se pudo cargar el perfil");
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return { profile, isLoading, error };
}
