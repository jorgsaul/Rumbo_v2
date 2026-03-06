"use client";
import { useParams } from "next/navigation";
import QuestionsEditor from "@/features/admin/components/tests/QuestionEditor";

export default function QuestionsPage() {
  const { testId } = useParams<{ testId: string }>();
  return <QuestionsEditor testId={testId} />;
}
