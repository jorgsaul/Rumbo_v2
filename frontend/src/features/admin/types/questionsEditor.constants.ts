import { DraftOption } from "./admin.types";
import { BookOpen, User, Shield } from "lucide-react";

export const PILARES = ["PASION", "VOCACION", "PROFESION", "MISION"];
export const DEFAULT_OPTIONS: DraftOption[] = [
  { label: "A", text: "", isCorrect: false, order: 0 },
  { label: "B", text: "", isCorrect: false, order: 1 },
  { label: "C", text: "", isCorrect: false, order: 2 },
  { label: "D", text: "", isCorrect: false, order: 3 },
];

export const ROLE_CONFIG = {
  ADMIN: { label: "Admin", color: "bg-danger/10 text-danger", icon: Shield },
  AUTHOR: {
    label: "Autor",
    color: "bg-primary/10 text-primary",
    icon: BookOpen,
  },
  STUDENT: {
    label: "Alumno",
    color: "bg-neutral-100 dark:bg-neutral-800 text-neutral-500",
    icon: User,
  },
};
