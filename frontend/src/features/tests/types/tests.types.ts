export type TestType = "VOCATIONAL" | "KNOWLEDGE";

export type TestStatus = "DRAFT" | "ACTIVE" | "INACTIVE";

export type IkigaiPilar = "PASION" | "VOCACION" | "PROFESION" | "MISION";

export type IkigaiZone =
  | "PROPOSITO_FUERTE"
  | "PROFESION_IDEAL"
  | "EXPLORAR_MAS";

export interface Option {
  id: string;
  questionId: string;
  label: string;
  text: string;
  imageUrl?: string | null;
  isCorrect: boolean;
  order: number;
}

export interface Question {
  id: string;
  testId: string;
  text: string;
  order: number;
  pilar?: IkigaiPilar | null;
  weights?: VocationalWeights | null;
  imageUrl?: string | null;
  statements?: { type: string; data: any };
  options: Option[];
}

export interface Test {
  id: string;
  title: string;
  description?: string | null;
  type: TestType;
  status: TestStatus;
  estimatedMinutes: number;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface VocationalWeights {
  tecnologico: number;
  cientifico: number;
  salud: number;
  administrativo: number;
  social: number;
}

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

export interface VocalTestResult {
  id: string;
  userId: string;
  testId: string;
  perfilTecnologico: number;
  perfilCientifico: number;
  perfilSalud: number;
  perfilAdministrativo: number;
  perfilSocial: number;
  topCarreras: CareerResult[];
  resultadosCompletos: CareerResult[];
  scoreGlobal: number;
  zonaIkigai: IkigaiZone;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeTestResult {
  id: string;
  userId: string;
  testId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  createdAt: string;
}

export type TestResult = VocalTestResult | KnowledgeTestResult;

export interface VocationalProgress {
  currentQuestionIndex: number;
  answers: Record<string, number>;
  savedAt: number;
}

export interface KnowledgeProgress {
  currentQuestionIndex: number;
  answers: Record<number, string>;
  savedAt: number;
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

export interface TestSummary {
  id: string;
  title: string;
  description?: string | null;
  type: TestType;
  status: TestStatus;
  estimatedMinutes: number;
  createdAt: string;
  updatedAt: string;
  _count: { questions: number };
}
