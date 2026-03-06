type StatementType = "none" | "enunciados" | "tabla";
import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { cn } from "@/lib";

export default function StatementsEditor({
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
