import { IkigaiZone } from "../types/tests.types";

export const ZONA_CONFIG: Record<
  IkigaiZone,
  { label: string; variant: "success" | "info" | "neutral" }
> = {
  PROPOSITO_FUERTE: { label: "Propósito fuerte", variant: "success" },
  PROFESION_IDEAL: { label: "Profesión ideal", variant: "info" },
  EXPLORAR_MAS: { label: "Explorar más", variant: "neutral" },
};

export const PILAR_CONFIG = {
  pasion: { label: "Pasión", color: "bg-danger", text: "text-danger" },
  vocacion: { label: "Vocación", color: "bg-info", text: "text-info" },
  profesion: { label: "Profesión", color: "bg-success", text: "text-success" },
  mision: { label: "Misión", color: "bg-warning", text: "text-warning" },
} as const;

export const MATERIA_LABELS: Record<string, string> = {
  matematicas: "Matemáticas",
  fisica: "Física",
  quimica: "Química",
  biologia: "Biología",
  expresion: "Expresión",
};

export const ODS_LABELS: Record<number, string> = {
  1: "Fin de la pobreza",
  2: "Hambre cero",
  3: "Salud y bienestar",
  4: "Educación de calidad",
  5: "Igualdad de género",
  6: "Agua limpia",
  7: "Energía asequible",
  8: "Trabajo decente",
  9: "Industria e innovación",
  10: "Reducción de desigualdades",
  11: "Ciudades sostenibles",
  12: "Producción responsable",
  13: "Acción por el clima",
  14: "Vida submarina",
  15: "Vida de ecosistemas terrestres",
  16: "Paz y justicia",
  17: "Alianzas para los objetivos",
};
