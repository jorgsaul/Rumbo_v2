"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  ArrowLeft,
  Loader2,
  GripVertical,
  Check,
} from "lucide-react";
import { adminService, AdminQuestion } from "../services/adminService";
import { cn } from "@/lib/utils/cn";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type DraftOption = {
  id?: string;
  label: string;
  text: string;
  isCorrect: boolean;
  order: number;
};

type StatementType = "none" | "enunciados" | "tabla";

type DraftQuestion = {
  id?: string;
  text: string;
  order: number;
  pilar?: string;
  statements?: { type: string; data: any };
  options: DraftOption[];
};

const PILARES = ["PASION", "VOCACION", "PROFESION", "MISION"];
const DEFAULT_OPTIONS: DraftOption[] = [
  { label: "A", text: "", isCorrect: false, order: 0 },
  { label: "B", text: "", isCorrect: false, order: 1 },
  { label: "C", text: "", isCorrect: false, order: 2 },
  { label: "D", text: "", isCorrect: false, order: 3 },
];

function newQuestion(order: number, isVocational: boolean): DraftQuestion {
  return {
    text: "",
    order,
    pilar: isVocational ? "PASION" : undefined,
    options: isVocational
      ? [] // vocacional usa Likert, no opciones
      : DEFAULT_OPTIONS.map((o) => ({ ...o })),
    statements: undefined,
  };
}

function OptionsEditor({
  options,
  onChange,
}: {
  options: DraftOption[];
  onChange: (opts: DraftOption[]) => void;
}) {
  const setCorrect = (idx: number) => {
    onChange(options.map((o, i) => ({ ...o, isCorrect: i === idx })));
  };

  const updateText = (idx: number, text: string) => {
    onChange(options.map((o, i) => (i === idx ? { ...o, text } : o)));
  };

  return (
    <div className="space-y-2">
      {options.map((opt, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <button
            onClick={() => setCorrect(idx)}
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border-2 transition-colors",
              opt.isCorrect
                ? "bg-success border-success text-white"
                : "border-neutral-200 dark:border-neutral-700 text-neutral-400 hover:border-success",
            )}
          >
            {opt.isCorrect ? (
              <Check size={13} />
            ) : (
              <span className="text-xs font-bold">{opt.label}</span>
            )}
          </button>
          <input
            value={opt.text}
            onChange={(e) => updateText(idx, e.target.value)}
            placeholder={`Opción ${opt.label}`}
            className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors"
          />
        </div>
      ))}
    </div>
  );
}

function StatementsEditor({
  statements,
  onChange,
}: {
  statements?: { type: string; data: any };
  onChange: (s: { type: string; data: any } | undefined) => void;
}) {
  const type = (statements?.type ?? "none") as StatementType;

  const [cache, setCache] = useState<Record<string, any>>({
    enunciados: statements?.type === "enunciados" ? statements.data : [],
    tabla:
      statements?.type === "tabla"
        ? statements.data
        : { columnas: [], filas: [] },
  });

  const setType = (t: StatementType) => {
    if (type !== "none") {
      setCache((prev) => ({ ...prev, [type]: statements?.data }));
    }
    if (t === "none") {
      onChange(undefined);
      return;
    }
    onChange({
      type: t,
      data: cache[t] ?? (t === "enunciados" ? [] : { columnas: [], filas: [] }),
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-neutral-400">Enunciado:</span>
        <div className="flex gap-1.5">
          {(["none", "enunciados", "tabla"] as StatementType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "text-xs px-2.5 py-1 rounded-full border transition-colors",
                type === t
                  ? "bg-primary text-white border-primary"
                  : "border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:border-primary",
              )}
            >
              {t === "none"
                ? "Ninguno"
                : t === "enunciados"
                  ? "Enunciados"
                  : "Tabla"}
            </button>
          ))}
        </div>
      </div>

      {/* Editor de enunciados */}
      {type === "enunciados" && (
        <div className="space-y-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
          <p className="text-xs font-medium text-neutral-400">Enunciados</p>
          {((statements?.data as string[]) ?? []).map(
            (item: string, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={item}
                  onChange={(e) => {
                    const arr = [...(statements?.data as string[])];
                    arr[i] = e.target.value;
                    onChange({ type: "enunciados", data: arr });
                  }}
                  placeholder={`Enunciado ${i + 1}`}
                  className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors"
                />
                <button
                  onClick={() => {
                    const arr = (statements?.data as string[]).filter(
                      (_, j) => j !== i,
                    );
                    onChange({ type: "enunciados", data: arr });
                  }}
                  className="p-1 text-neutral-300 hover:text-danger transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ),
          )}
          <button
            onClick={() =>
              onChange({
                type: "enunciados",
                data: [...((statements?.data as string[]) ?? []), ""],
              })
            }
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <Plus size={12} /> Agregar enunciado
          </button>
        </div>
      )}

      {/* Editor de tabla */}
      {type === "tabla" && (
        <div className="space-y-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
          <p className="text-xs font-medium text-neutral-400">Tabla</p>

          {/* Columnas */}
          <div className="space-y-1.5">
            <p className="text-xs text-neutral-400">Columnas</p>
            <div className="flex flex-wrap gap-2">
              {((statements?.data?.columnas as string[]) ?? []).map(
                (col: string, i: number) => (
                  <div key={i} className="flex items-center gap-1">
                    <input
                      value={col}
                      onChange={(e) => {
                        const cols = [...statements!.data.columnas];
                        cols[i] = e.target.value;
                        onChange({
                          type: "tabla",
                          data: { ...statements!.data, columnas: cols },
                        });
                      }}
                      placeholder={`Col ${i + 1}`}
                      className="w-24 px-2 py-1 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 outline-none focus:border-primary"
                    />
                    <button
                      onClick={() => {
                        const cols = statements!.data.columnas.filter(
                          (_: any, j: number) => j !== i,
                        );
                        const filas = statements!.data.filas.map(
                          (f: string[]) =>
                            f.filter((_: any, j: number) => j !== i),
                        );
                        onChange({
                          type: "tabla",
                          data: { columnas: cols, filas },
                        });
                      }}
                      className="text-neutral-300 hover:text-danger transition-colors"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                ),
              )}
              <button
                onClick={() => {
                  const cols = [...(statements?.data?.columnas ?? []), ""];
                  const filas = (statements?.data?.filas ?? []).map(
                    (f: string[]) => [...f, ""],
                  );
                  onChange({ type: "tabla", data: { columnas: cols, filas } });
                }}
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <Plus size={12} /> Col
              </button>
            </div>
          </div>

          {/* Filas */}
          <div className="space-y-1.5">
            <p className="text-xs text-neutral-400">Filas</p>
            {((statements?.data?.filas as string[][]) ?? []).map(
              (fila: string[], i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex gap-1.5 flex-1 flex-wrap">
                    {fila.map((celda: string, j: number) => (
                      <input
                        key={j}
                        value={celda}
                        onChange={(e) => {
                          const filas = statements!.data.filas.map(
                            (f: string[], fi: number) =>
                              fi === i
                                ? f.map((c: string, ci: number) =>
                                    ci === j ? e.target.value : c,
                                  )
                                : f,
                          );
                          onChange({
                            type: "tabla",
                            data: { ...statements!.data, filas },
                          });
                        }}
                        placeholder={`[${i + 1},${j + 1}]`}
                        className="w-24 px-2 py-1 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 outline-none focus:border-primary"
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      const filas = statements!.data.filas.filter(
                        (_: any, fi: number) => fi !== i,
                      );
                      onChange({
                        type: "tabla",
                        data: { ...statements!.data, filas },
                      });
                    }}
                    className="text-neutral-300 hover:text-danger transition-colors shrink-0"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ),
            )}
            <button
              onClick={() => {
                const empty = new Array(
                  statements?.data?.columnas?.length ?? 0,
                ).fill("");
                const filas = [...(statements?.data?.filas ?? []), empty];
                onChange({
                  type: "tabla",
                  data: { ...statements!.data, filas },
                });
              }}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              <Plus size={12} /> Fila
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Card de pregunta ─────────────────────────────────────────────────────────
function QuestionCard({
  question,
  index,
  total,
  isVocational,
  onChange,
  onDelete,
  onMove,
}: {
  question: DraftQuestion;
  index: number;
  total: number;
  isVocational: boolean;
  onChange: (q: DraftQuestion) => void;
  onDelete: () => void;
  onMove: (dir: "up" | "down") => void;
}) {
  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      className="space-y-3"
    >
      <div className="flex items-start gap-2">
        <div className="flex flex-col gap-0.5 shrink-0 mt-1">
          <button
            disabled={index === 0}
            onClick={() => onMove("up")}
            className="p-0.5 rounded text-neutral-300 hover:text-neutral-500 disabled:opacity-30 transition-colors"
          >
            <ChevronUp size={14} />
          </button>
          <span className="text-xs text-neutral-400 text-center font-mono">
            {index + 1}
          </span>
          <button
            disabled={index === total - 1}
            onClick={() => onMove("down")}
            className="p-0.5 rounded text-neutral-300 hover:text-neutral-500 disabled:opacity-30 transition-colors"
          >
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="flex-1 space-y-3">
          <textarea
            value={question.text}
            onChange={(e) => onChange({ ...question, text: e.target.value })}
            placeholder="Texto de la pregunta"
            rows={2}
            className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors resize-none"
          />

          {isVocational && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">Pilar:</span>
              <div className="flex gap-1.5 flex-wrap">
                {PILARES.map((p) => (
                  <button
                    key={p}
                    onClick={() => onChange({ ...question, pilar: p })}
                    className={cn(
                      "text-xs px-2.5 py-1 rounded-full border transition-colors font-medium",
                      question.pilar === p
                        ? "bg-primary text-white border-primary"
                        : "border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:border-primary",
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          <StatementsEditor
            statements={question.statements}
            onChange={(s) => onChange({ ...question, statements: s })}
          />

          {!isVocational && (
            <OptionsEditor
              options={question.options}
              onChange={(opts) => onChange({ ...question, options: opts })}
            />
          )}
        </div>

        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg text-neutral-300 hover:text-danger hover:bg-danger/10 transition-colors shrink-0"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </Card>
  );
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
          options: q.options.map((o) => ({
            id: o.id,
            label: o.label,
            text: o.text,
            isCorrect: o.isCorrect,
            order: o.order,
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
