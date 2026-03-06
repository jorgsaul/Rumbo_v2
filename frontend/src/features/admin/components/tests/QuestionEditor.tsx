"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Save, ArrowLeft, Loader2, Check } from "lucide-react";
import { adminService } from "../../services/adminService";
import { AdminQuestion } from "../../types/admin.types";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui";
import QuestionCard from "./QuestionCard";
import { DraftQuestion } from "../../types/admin.types";
import { DEFAULT_OPTIONS } from "../../types/questionsEditor.constants";

function newQuestion(order: number, isVocational: boolean): DraftQuestion {
  return {
    text: "",
    order,
    pilar: isVocational ? "PASION" : undefined,
    options: isVocational ? [] : DEFAULT_OPTIONS.map((o) => ({ ...o })),
    statements: undefined,
  };
}

export default function QuestionsEditor({ testId }: { testId: string }) {
  const router = useRouter();
  const [test, setTest] = useState<any>(null);
  const [questions, setQuestions] = useState<DraftQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const isVocational = test?.type === "VOCATIONAL";

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminService.getTestById(testId);
        setTest(data);
        setQuestions(
          data.questions.map((q: AdminQuestion) => ({
            id: q.id,
            text: q.text,
            order: q.order,
            pilar: q.pilar ?? undefined,
            imageUrl: q.imageUrl ?? null,
            statements:
              q.statements && Object.keys(q.statements).length > 0
                ? q.statements
                : undefined,
            options: q.options.map((o) => ({
              id: o.id,
              label: o.label,
              text: o.text,
              isCorrect: o.isCorrect,
              order: o.order,
              imageUrl: o.imageUrl ?? null,
            })),
          })),
        );
      } catch {
        setError("Error cargando el test");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [testId]);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, newQuestion(prev.length, isVocational)]);
  };

  const updateQuestion = (idx: number, q: DraftQuestion) => {
    setQuestions((prev) => prev.map((item, i) => (i === idx ? q : item)));
  };

  const deleteQuestion = (idx: number) => {
    setQuestions((prev) =>
      prev.filter((_, i) => i !== idx).map((q, i) => ({ ...q, order: i })),
    );
  };

  const moveQuestion = (idx: number, dir: "up" | "down") => {
    const next = [...questions];
    const swap = dir === "up" ? idx - 1 : idx + 1;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setQuestions(next.map((q, i) => ({ ...q, order: i })));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const saved = await adminService.upsertQuestions(testId, questions);
      setTest(saved);
      setQuestions(
        saved.questions.map((q: AdminQuestion) => ({
          id: q.id,
          text: q.text,
          order: q.order,
          pilar: q.pilar ?? undefined,
          statements: q.statements ?? undefined,
          imageUrl: q.imageUrl ?? null,
          options: q.options.map((o) => ({
            id: o.id,
            label: o.label,
            text: o.text,
            isCorrect: o.isCorrect,
            order: o.order,
            imageUrl: o.imageUrl ?? null,
          })),
        })),
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Error guardando preguntas");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] gap-3">
        <Loader2 size={20} className="animate-spin text-primary" />
        <span className="text-sm text-neutral-400">Cargando test...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/tests")}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">
              {test?.title}
            </h1>
            <p className="text-xs text-neutral-400">
              {questions.length} preguntas ·{" "}
              {test?.type === "VOCATIONAL" ? "Vocacional" : "Conocimientos"}
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={saved ? <Check size={15} /> : <Save size={15} />}
          onClick={handleSave}
          loading={isSaving}
          className={cn(saved && "bg-success border-success")}
        >
          {saved ? "Guardado" : "Guardar"}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-danger bg-danger/10 px-4 py-2 rounded-xl">
          {error}
        </p>
      )}

      <div className="space-y-3">
        {questions.map((q, idx) => (
          <QuestionCard
            key={idx}
            question={q}
            index={idx}
            total={questions.length}
            isVocational={isVocational}
            onChange={(updated) => updateQuestion(idx, updated)}
            onDelete={() => deleteQuestion(idx)}
            onMove={(dir) => moveQuestion(idx, dir)}
          />
        ))}
      </div>

      <button
        onClick={addQuestion}
        className="w-full py-3 rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 text-sm text-neutral-400 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Agregar pregunta
      </button>

      {questions.length > 0 && (
        <div className="pb-8 flex justify-end">
          <Button
            variant="primary"
            size="md"
            leftIcon={saved ? <Check size={15} /> : <Save size={15} />}
            onClick={handleSave}
            loading={isSaving}
            className={cn(saved && "bg-success border-success")}
          >
            {saved ? "Guardado" : "Guardar cambios"}
          </Button>
        </div>
      )}
    </div>
  );
}
