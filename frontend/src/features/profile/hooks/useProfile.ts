"use client";

import { useState, useEffect } from "react";
import { profileService, ProfileData } from "../services/profileServices";

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
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

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, isLoading, error, retry: fetchProfile };
}
