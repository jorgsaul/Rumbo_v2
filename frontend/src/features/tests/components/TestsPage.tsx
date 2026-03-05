"use client";

import { FlaskConical, BookOpen, AlertCircle } from "lucide-react";
import { useTests } from "@/features/tests/hooks/useTests";
import TestCard from "@/features/tests/components/TestCard";
import Card from "@/components/ui/Card";

function SectionSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2].map((i) => (
        <Card key={i} padding="md" rounded="xl" border="light" shadow="sm">
          <div className="flex items-start gap-4 animate-pulse">
            <div className="w-11 h-11 rounded-xl bg-neutral-200 dark:bg-neutral-800 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
              <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
              <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function TestsPage() {
  const { vocationalTests, knowledgeTests, isLoading, error } = useTests();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3 text-center p-4">
        <AlertCircle size={32} className="text-danger" />
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Tests
        </h1>
        <p className="text-sm text-neutral-400">
          Descubre tu perfil vocacional y pon a prueba tus conocimientos. Puedes
          revisar tus resultados en tu perfil.
        </p>
      </div>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <FlaskConical size={16} className="text-primary" />
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-widest">
            Vocacionales
          </h2>
        </div>

        {isLoading ? (
          <SectionSkeleton />
        ) : vocationalTests.length === 0 ? (
          <p className="text-sm text-neutral-400 py-2">
            No hay tests vocacionales disponibles.
          </p>
        ) : (
          <div className="space-y-3">
            {vocationalTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-info" />
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-widest">
            Conocimientos
          </h2>
        </div>

        {isLoading ? (
          <SectionSkeleton />
        ) : knowledgeTests.length === 0 ? (
          <p className="text-sm text-neutral-400 py-2">
            No hay tests de conocimientos disponibles.
          </p>
        ) : (
          <div className="space-y-3">
            {knowledgeTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
