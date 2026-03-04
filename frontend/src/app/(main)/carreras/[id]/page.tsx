"use client";
import { useParams } from "next/navigation";
import CareerDetailPage from "@/features/tests/components/vocational/results/CareerDetailPage";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return <CareerDetailPage careerId={id} />;
}
