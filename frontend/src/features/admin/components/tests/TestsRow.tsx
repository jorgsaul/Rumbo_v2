import { AdminTestSummary } from "../../services/adminService";
import {
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  FlaskConical,
  BookOpen,
  ListOrdered,
} from "lucide-react";
import { cn } from "@/lib";
import { useConfirmation } from "@/context/ConfirmationContext";
import { Status } from "@/components/ui";

const STATUS_CONFIG = {
  ACTIVE: { label: "Activo", color: "bg-success/10" },
  DRAFT: { label: "Borrador", color: "bg-warning/10g" },
  INACTIVE: {
    label: "Inactivo",
    color: "bg-neutral-100 dark:bg-neutral-800",
  },
};

export default function TestRow({
  test,
  onEdit,
  onToggleStatus,
  onDelete,
  onEditQuestions,
}: {
  test: AdminTestSummary;
  onEdit: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
  onEditQuestions: () => void;
}) {
  const statusCfg = STATUS_CONFIG[test.status];
  const isActive = test.status === "ACTIVE";
  const { confirm } = useConfirmation();

  const handleDelete = async () => {
    const ok = await confirm({
      title: "ELIMINACION DE TEST",
      description:
        "Estas a punto de eliminar un test, la acción NO es reversible. ¿Estas seguro de querer elimnarlo?",
      category: "danger",
    });

    if (!ok) return;

    try {
      onDelete();
    } catch (e) {
      console.error(e);
    }
  };

  const results =
    test.type === "VOCATIONAL"
      ? test._count.vocalResults
      : test._count.knowledgeResults;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
          test.type === "VOCATIONAL" ? "bg-primary/10" : "bg-info/10",
        )}
      >
        {test.type === "VOCATIONAL" ? (
          <FlaskConical size={15} className="text-primary" />
        ) : (
          <BookOpen size={15} className="text-info" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100 truncate">
          {test.title}
        </p>
        <p className="text-xs text-neutral-400">
          {test._count.questions} preguntas · {results} resultados
        </p>
      </div>

      <Status status={statusCfg} />

      <div className="flex items-center gap-1">
        <button
          onClick={onToggleStatus}
          title={isActive ? "Desactivar" : "Activar"}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          {isActive ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
        <button
          onClick={onEdit}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-danger hover:bg-danger/10 transition-colors"
        >
          <Trash2 size={15} />
        </button>
        <button
          onClick={onEditQuestions}
          title="Editar preguntas"
          className="p-1.5 rounded-lg text-neutral-400 hover:text-info hover:bg-info/10 transition-colors"
        >
          <ListOrdered size={15} />
        </button>
      </div>
    </div>
  );
}
