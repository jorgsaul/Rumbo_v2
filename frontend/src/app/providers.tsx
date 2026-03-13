"use client";

import ToastProvider from "@/context/ToastContext";
import ConfirmationProvider from "@/context/ConfirmationContext";
import ConfirmModal from "@/components/shared/ConfirmModal";

import { GoogleOAuthProvider } from "@react-oauth/google";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <ToastProvider>
        <ConfirmationProvider>
          {children}
          <ConfirmModal />
        </ConfirmationProvider>
      </ToastProvider>
    </GoogleOAuthProvider>
  );
}
