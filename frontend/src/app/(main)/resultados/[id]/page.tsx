"use client";
import { useParams } from "next/navigation";
import VocalResultDetail from "@/features/tests/components/vocational/results/VocalResultDetail";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return <VocalResultDetail resultId={id} />;
}
