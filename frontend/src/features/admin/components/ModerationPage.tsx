"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Flag,
  Loader2,
  EyeOff,
  Trash2,
} from "lucide-react";
import { adminService } from "../services/adminService";

import { AdminFlaggedPost, ModerationStats } from "../types/admin.types";
import { cn } from "@/lib/utils/cn";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatDate } from "@/utils/FormatDate";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: any;
  color: string;
}) {
  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      className="flex items-center gap-3"
    >
      <div
        className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
          color,
        )}
      >
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xl font-bold text-neutral-900 dark:text-white">
          {value}
        </p>
        <p className="text-xs text-neutral-400">{label}</p>
      </div>
    </Card>
  );
}

function ReportCard({
  report,
  onModerate,
  isLoading,
}: {
  report: AdminFlaggedPost;
  onModerate: (postId: string, action: "APPROVE" | "REJECT") => void;
  isLoading: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      className="space-y-3"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-danger/10 flex items-center justify-center shrink-0">
            <AlertTriangle size={13} className="text-danger" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-neutral-400">
              Reportado hace {formatDate(report.createdAt)}
            </p>
            <p className="text-xs text-neutral-400 mt-0.5">
              {report._count.reports} reporte
              {report._count.reports !== 1 ? "s" : ""} en este post
            </p>
          </div>
        </div>
        <span
          className={cn(
            "text-xs px-2 py-0.5 rounded-full font-medium shrink-0",
            report.isHidden
              ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-400"
              : "bg-warning/10 text-warning",
          )}
        >
          {report.isHidden ? "Oculto" : "Visible"}
        </span>
      </div>

      {/* Post */}
      {/* Contenido del post */}
      <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden shrink-0">
            {report.author.avatarUrl ? (
              <Image
                src={report.author.avatarUrl}
                alt=""
                width={24}
                height={24}
                className="object-cover"
              />
            ) : (
              <span className="text-xs font-bold text-neutral-400 w-full h-full flex items-center justify-center">
                {report.author.username[0].toUpperCase()}
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
            @{report.author.username}
          </span>
        </div>

        {report.title && (
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
            {report.title}
          </p>
        )}

        <p
          className={cn(
            "text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed",
            !expanded && "line-clamp-3",
          )}
        >
          {report.content}
        </p>

        {report.content.length > 150 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-primary hover:underline"
          >
            {expanded ? "Ver menos" : "Ver más"}
          </button>
        )}

        {report.mediaUrl && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src={report.mediaUrl}
              alt="Media"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-2 pt-1">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<CheckCircle size={14} />}
          onClick={() => onModerate(report.id, "APPROVE")}
          className="border border-success/30 text-success hover:bg-success/10 flex-1"
        >
          Aprobar y restaurar
        </Button>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Trash2 size={14} />}
          onClick={() => onModerate(report.id, "REJECT")}
          className="border border-danger/30 text-danger hover:bg-danger/10 flex-1"
        >
          Eliminar post
        </Button>
      </div>
    </Card>
  );
}

export default function ModerationPage() {
  const [reports, setReports] = useState<AdminFlaggedPost[]>([]);
  const [stats, setStats] = useState<ModerationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [moderatingId, setModeratingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [reportsData, statsData] = await Promise.all([
        adminService.getReports(),
        adminService.getModerationStats(),
      ]);
      setReports(reportsData);
      setStats(statsData);
    } catch {
      setError("Error cargando reportes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleModerate = async (
    postId: string,
    action: "APPROVE" | "REJECT",
  ) => {
    setModeratingId(postId);
    try {
      await adminService.moderatePost(postId, action);
      // Quitar los reportes de ese post de la lista
      setReports((prev) => prev.filter((r) => r.id !== postId));
      // Actualizar stats
      if (stats) {
        setStats({
          ...stats,
          pending: Math.max(0, stats.pending - 1),
          approved: action === "APPROVE" ? stats.approved + 1 : stats.approved,
          rejected: action === "REJECT" ? stats.rejected + 1 : stats.rejected,
        });
      }
    } catch {
      setError("Error al moderar");
    } finally {
      setModeratingId(null);
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

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Moderación
        </h1>
        <p className="text-sm text-neutral-400 mt-0.5">
          Gestiona los reportes y publicaciones
        </p>
      </div>

      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <StatCard
            label="Pendientes"
            value={stats.pending}
            icon={AlertTriangle}
            color="bg-warning/10 text-warning"
          />
          <StatCard
            label="Aprobados"
            value={stats.approved}
            icon={CheckCircle}
            color="bg-success/10 text-success"
          />
          <StatCard
            label="Rechazados"
            value={stats.rejected}
            icon={XCircle}
            color="bg-danger/10 text-danger"
          />
          <StatCard
            label="Marcados"
            value={stats.flagged}
            icon={Flag}
            color="bg-info/10 text-info"
          />
          <StatCard
            label="Ocultos"
            value={stats.hidden}
            icon={EyeOff}
            color="bg-neutral-100 dark:bg-neutral-800 text-neutral-400"
          />
        </div>
      )}

      {error && (
        <p className="text-sm text-danger bg-danger/10 px-4 py-2 rounded-xl">
          {error}
        </p>
      )}

      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center">
            <CheckCircle size={24} className="text-success" />
          </div>
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Sin reportes pendientes
          </p>
          <p className="text-xs text-neutral-400">
            La plataforma está limpia 🎉
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-neutral-500">
            {reports.length} reporte{reports.length !== 1 ? "s" : ""} pendiente
            {reports.length !== 1 ? "s" : ""}
          </p>
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onModerate={handleModerate}
              isLoading={moderatingId === report.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
