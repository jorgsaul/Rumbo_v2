export type TestType = "VOCATIONAL" | "KNOWLEDGE";

export type TestStatus = "DRAFT" | "ACTIVE" | "INACTIVE";

export type IkigaiPilar = "PASION" | "VOCACION" | "PROFESION" | "MISION";

export type IkigaiZone =
  | "PROPOSITO_FUERTE"
  | "PROFESION_IDEAL"
  | "EXPLORAR_MAS";

export interface VocationalProfile {
  tecnologico: number;
  cientifico: number;
  salud: number;
  administrativo: number;
  social: number;
}

export interface CareerResult {
  id: string;
  name: string;
  compatibility: number;
  zonaIkigai: IkigaiZone;
  scores: {
    pasion: number;
    vocacion: number;
    profesion: number;
    mision: number;
  };
}

export interface SubmitVocationalPayload {
  testId: string;
  answers: Record<string, number>;
  profile: VocationalProfile;
  topCareers: CareerResult[];
  resultadosCompletos: CareerResult[];
  scoreGlobal: number;
  zonaIkigai: IkigaiZone;
}

export interface SubmitKnowledgePayload {
  testId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}
