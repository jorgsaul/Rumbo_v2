"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Search, Loader2, ToggleLeft, ToggleRight } from "lucide-react";
import { adminService } from "../../services/adminService";
import { AdminUser } from "../../types/admin.types";
import { cn } from "@/lib/utils/cn";
import Card from "@/components/ui/Card";
import { formatDate } from "@/utils/FormatDate";
import { ROLE_CONFIG } from "../../types/questionsEditor.constants";

function UserRow({
  user,
  onRoleChange,
  onToggleActive,
  isUpdating,
}: {
  user: AdminUser;
  onRoleChange: (userId: string, role: string) => void;
  onToggleActive: (userId: string, isActive: boolean) => void;
  isUpdating: boolean;
}) {
  const roleConfig = ROLE_CONFIG[user.role];

  return (
    <Card
      padding="sm"
      rounded="xl"
      border="light"
      shadow="sm"
      className={cn("transition-opacity", !user.isActive && "opacity-50")}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 overflow-hidden shrink-0 flex items-center justify-center">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt=""
              width={36}
              height={36}
              className="object-cover"
            />
          ) : (
            <span className="text-xs font-bold text-primary">
              {user.username.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
              @{user.username}
            </p>
            {!user.isActive && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                Inactivo
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-400 truncate">{user.email}</p>
          <p className="text-xs text-neutral-300 dark:text-neutral-600">
            {user._count.posts} posts · {user._count.followers} seguidores ·{" "}
            {formatDate(user.createdAt)}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={user.role}
            onChange={(e) => onRoleChange(user.id, e.target.value)}
            disabled={isUpdating}
            className="text-xs px-2 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 outline-none focus:border-primary cursor-pointer"
          >
            <option value="STUDENT">Alumno</option>
            <option value="AUTHOR">Autor</option>
            <option value="ADMIN">Admin</option>
          </select>

          {/* Toggle activo */}
          <button
            onClick={() => onToggleActive(user.id, !user.isActive)}
            disabled={isUpdating}
            className={cn(
              "p-1.5 rounded-lg transition-colors",
              user.isActive
                ? "text-success hover:bg-success/10"
                : "text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
            )}
            title={user.isActive ? "Desactivar usuario" : "Activar usuario"}
          >
            {isUpdating ? (
              <Loader2 size={16} className="animate-spin" />
            ) : user.isActive ? (
              <ToggleRight size={16} />
            ) : (
              <ToggleLeft size={16} />
            )}
          </button>
        </div>
      </div>
    </Card>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (q?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await adminService.getUsers(q);
      setUsers(data);
    } catch {
      setError("Error cargando usuarios");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const timeout = setTimeout(() => fetchUsers(search || undefined), 400);
    return () => clearTimeout(timeout);
  }, [search, fetchUsers]);

  const handleRoleChange = async (userId: string, role: string) => {
    setUpdatingId(userId);
    try {
      await adminService.updateUser(userId, { role });
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, role: role as AdminUser["role"] } : u,
        ),
      );
    } catch {
      setError("Error actualizando rol");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleActive = async (userId: string, isActive: boolean) => {
    setUpdatingId(userId);
    try {
      await adminService.updateUser(userId, { isActive });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isActive } : u)),
      );
    } catch {
      setError("Error actualizando usuario");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Usuarios
        </h1>
        <p className="text-sm text-neutral-400 mt-0.5">
          Gestiona roles y acceso de usuarios
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, usuario o email..."
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors"
        />
      </div>

      {error && (
        <p className="text-sm text-danger bg-danger/10 px-4 py-2 rounded-xl">
          {error}
        </p>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-16 gap-3">
          <Loader2 size={20} className="animate-spin text-primary" />
          <span className="text-sm text-neutral-400">Cargando...</span>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-neutral-400">{users.length} usuarios</p>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onRoleChange={handleRoleChange}
              onToggleActive={handleToggleActive}
              isUpdating={updatingId === user.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
