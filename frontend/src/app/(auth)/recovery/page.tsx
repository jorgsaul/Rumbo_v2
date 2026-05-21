"use client";

import { useSearchParams } from "next/navigation";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

export default function RecoveryPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="w-full max-w-sm flex flex-col gap-6">
      {token ? <ResetPasswordForm token={token} /> : <ForgotPasswordForm />}
    </div>
  );
}
