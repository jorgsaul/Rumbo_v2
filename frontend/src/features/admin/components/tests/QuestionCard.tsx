import { DraftQuestion } from "../../types/admin.types";
import { Card } from "@/components/ui";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import ImageUploader from "./ImageUploader";
import { PILARES } from "../../types/questionsEditor.constants";
import { cn } from "@/lib";
import StatementsEditor from "./StatementsEditor";
import OptionsEditor from "./OptionsEditor";

export default function QuestionCard({
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

          <ImageUploader
            imageUrl={question.imageUrl}
            folder="questions"
            onUpload={(url) => onChange({ ...question, imageUrl: url })}
            onRemove={() => onChange({ ...question, imageUrl: null })}
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
