import type { Question } from "../../types/tests.types";
import MathText from "@/components/ui/MathText";

interface StatementProps {
  question: Question;
}

export default function StatementQuestion({ question }: StatementProps) {
  const typeData = question.statements?.type;
  const data = question.statements?.data;

  return (
    <>
      {question.imageUrl && (
        <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
          <img
            src={question.imageUrl}
            alt="Imagen de la pregunta"
            className="w-full object-contain max-h-52"
          />
        </div>
      )}

      {typeData === "tabla" && (
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-neutral-100 dark:bg-neutral-800">
                {data?.columnas?.map((col: string, i: number) => (
                  <th key={i} className="px-6 py-4 text-left font-medium">
                    <MathText text={col} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.filas?.map((fila: string[], i: number) => (
                <tr
                  key={i}
                  className="border-b border-neutral-200 dark:border-neutral-700"
                >
                  {fila.map((celda: string, j: number) => (
                    <td key={j} className="px-6 py-4">
                      <MathText text={celda} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {typeData === "enunciados" && (
        <div className="space-y-3 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/50">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">
            Enunciados
          </h3>
          <div className="flex flex-wrap gap-3">
            {data.map((valor: string, index: number) => (
              <div key={index} className="group relative">
                <div className="pl-3 pr-5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 shadow-sm">
                  <MathText text={valor} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
