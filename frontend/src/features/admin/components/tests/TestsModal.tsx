import { Button, Card } from "@/components/ui";
import { useState } from "react";
import { AdminTestSummary, CreateTestData } from "../../services/adminService";

export default function TestModal({
  test,
  onClose,
  onSave,
}: {
  test?: AdminTestSummary | null;
  onClose: () => void;
  onSave: (data: CreateTestData) => Promise<void>;
}) {
  const [title, setTitle] = useState(test?.title ?? "");
  const [description, setDescription] = useState(test?.description ?? "");
  const [type, setType] = useState<"VOCATIONAL" | "KNOWLEDGE">(
    test?.type ?? "KNOWLEDGE",
  );
  const [minutes, setMinutes] = useState(test?.estimatedMinutes ?? 15);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!title.trim()) {
      setError("El título es requerido");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSave({
        title: title.trim(),
        description: description.trim() || undefined,
        type,
        estimatedMinutes: minutes,
      });
      onClose();
    } catch {
      setError("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card
        padding="lg"
        rounded="2xl"
        border="light"
        shadow="md"
        className="w-full max-w-md space-y-4"
      >
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          {test ? "Editar test" : "Nuevo test"}
        </h2>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-500">
              Título
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nombre del test"
              className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-500">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción opcional"
              rows={3}
              className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-500">
                Tipo
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                disabled={!!test}
                className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors disabled:opacity-50"
              >
                <option value="KNOWLEDGE">Conocimientos</option>
                <option value="VOCATIONAL">Vocacional</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-500">
                Minutos estimados
              </label>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                min={1}
                className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {error && <p className="text-xs text-danger">{error}</p>}

        <div className="flex gap-2 pt-2">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={onClose}
            className="border border-neutral-200 dark:border-neutral-700"
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleSave}
            loading={saving}
          >
            {test ? "Guardar cambios" : "Crear test"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
