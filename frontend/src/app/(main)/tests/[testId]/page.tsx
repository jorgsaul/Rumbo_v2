"use client";

import { useParams } from "next/navigation";
import { useVocationalTestStore } from "@/features/tests/stores/useVocationalTestStore";
import TestKnowledge from "@/features/tests/components/knowledge/TestKnowledge";
import TestVocacional from "@/features/tests/components/vocational/TestVocational";

export default function TestPage() {
  const { test } = useVocationalTestStore();
  const { testId } = useParams<{ testId: string }>();
  return test?.type === "KNOWLEDGE" ? (
    <TestKnowledge testId={testId} />
  ) : (
    <TestVocacional testId={testId} />
  );
}
