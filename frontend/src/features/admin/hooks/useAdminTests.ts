import { useState, useEffect, useCallback } from "react";
import {
  adminService,
  AdminTestSummary,
  AdminStats,
  CreateTestData,
} from "../services/adminService";

export const useAdminTests = () => {
  const [tests, setTests] = useState<AdminTestSummary[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [testsData, statsData] = await Promise.all([
        adminService.getTests(),
        adminService.getStats(),
      ]);
      setTests(testsData);
      setStats(statsData);
    } catch {
      setError("Error cargando datos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const createTest = async (data: CreateTestData) => {
    const newTest = await adminService.createTest(data);
    setTests((prev) => [newTest, ...prev]);
    return newTest;
  };

  const updateTest = async (
    testId: string,
    data: Partial<CreateTestData & { status: string }>,
  ) => {
    const updated = await adminService.updateTest(testId, data);
    setTests((prev) => prev.map((t) => (t.id === testId ? updated : t)));
    return updated;
  };

  const deleteTest = async (testId: string) => {
    await adminService.deleteTest(testId);
    setTests((prev) => prev.filter((t) => t.id !== testId));
  };

  return {
    tests,
    stats,
    isLoading,
    error,
    createTest,
    updateTest,
    deleteTest,
    refetch: fetchAll,
  };
};
