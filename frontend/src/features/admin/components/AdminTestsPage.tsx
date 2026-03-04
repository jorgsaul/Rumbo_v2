"use client";

import { useState } from "react";
import {
  FlaskConical,
  BookOpen,
  Users,
  BarChart2,
  Plus,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useAdminTests } from "../hooks/useAdminTests";
import { AdminTestSummary, CreateTestData } from "../services/adminService";
import { Card, Button } from "@/components/ui";
import StatCard from "./StatCard";
import TestModal from "./TestsModal";
import TestRow from "./TestsRow";
import { useRouter } from "next/navigation";

export default function AdminTestsPage() {
  const { tests, stats, isLoading, error, createTest, updateTest, deleteTest } =
    useAdminTests();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<AdminTestSummary | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const handleSave = async (data: CreateTestData) => {
    if (editingTest) {
      await updateTest(editingTest.id, data);
    } else {
      await createTest(data);
    }
  };

  const handleToggleStatus = async (test: AdminTestSummary) => {
    const newStatus = test.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    await updateTest(test.id, { status: newStatus });
  };

  const handleDelete = async (testId: string) => {
    setDeletingId(testId);
    try {
      await deleteTest(testId);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] gap-3">
        <Loader2 size={20} className="animate-spin text-primary" />
        <span className="text-sm text-neutral-400">Cargando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <AlertCircle size={32} className="text-danger" />
        <p className="text-sm text-neutral-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Tests
          </h1>
          <p className="text-sm text-neutral-400 mt-0.5">
            Gestiona los tests de la plataforma
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus size={16} />}
          onClick={() => {
            setEditingTest(null);
            setModalOpen(true);
          }}
        >
          Nuevo test
        </Button>
      </div>

      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label="Usuarios"
            value={stats.totalUsers}
            icon={Users}
            color="bg-primary/10 text-primary"
          />
          <StatCard
            label="Tests"
            value={stats.totalTests}
            icon={BarChart2}
            color="bg-info/10 text-info"
          />
          <StatCard
            label="Vocacionales"
            value={stats.totalVocational}
            icon={FlaskConical}
            color="bg-success/10 text-success"
          />
          <StatCard
            label="Conocimientos"
            value={stats.totalKnowledge}
            icon={BookOpen}
            color="bg-warning/10 text-warning"
          />
        </div>
      )}

      <Card padding="md" rounded="xl" border="light" shadow="sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Todos los tests ({tests.length})
          </h2>
        </div>

        {tests.length === 0 ? (
          <p className="text-sm text-neutral-400 py-4 text-center">
            No hay tests creados aún.
          </p>
        ) : (
          <div>
            {tests.map((test) => (
              <TestRow
                key={test.id}
                test={test}
                onEdit={() => {
                  setEditingTest(test);
                  setModalOpen(true);
                }}
                onToggleStatus={() => handleToggleStatus(test)}
                onDelete={() => handleDelete(test.id)}
                onEditQuestions={() =>
                  router.push(`/admin/tests/${test.id}/questions`)
                }
              />
            ))}
          </div>
        )}
      </Card>

      {modalOpen && (
        <TestModal
          test={editingTest}
          onClose={() => {
            setModalOpen(false);
            setEditingTest(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
