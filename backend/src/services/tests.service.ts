import prisma from "../lib/prisma";
import type { IkigaiZone } from "@prisma/client";

export const getTestsService = async () => {
  return prisma.test.findMany({
    where: { status: "ACTIVE" },
    select: {
      id: true,
      title: true,
      description: true,
      type: true,
      status: true,
      estimatedMinutes: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { questions: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getTestByIdService = async (testId: string) => {
  const test = await prisma.test.findUnique({
    where: { id: testId, status: "ACTIVE" },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: {
          options: {
            orderBy: { order: "asc" },
            select: {
              id: true,
              questionId: true,
              label: true,
              text: true,
              imageUrl: true,
              isCorrect: true,
              order: true,
            },
          },
        },
      },
    },
  });

  if (!test) throw new Error("Test no encontrado");
  return test;
};

interface SubmitVocationalPayload {
  testId: string;
  answers: Record<string, number>;
  profile: {
    tecnologico: number;
    cientifico: number;
    salud: number;
    administrativo: number;
    social: number;
  };
  topCareers: any[];
  resultadosCompletos: any[];
  scoreGlobal: number;
  zonaIkigai: IkigaiZone;
}

export const submitVocationalService = async (
  userId: string,
  payload: SubmitVocationalPayload,
) => {
  const test = await prisma.test.findUnique({
    where: { id: payload.testId, type: "VOCATIONAL", status: "ACTIVE" },
  });

  if (!test) throw new Error("Test no encontrado");

  const result = await prisma.vocalTestResult.create({
    data: {
      userId,
      testId: payload.testId,
      perfilTecnologico: payload.profile.tecnologico,
      perfilCientifico: payload.profile.cientifico,
      perfilSalud: payload.profile.salud,
      perfilAdministrativo: payload.profile.administrativo,
      perfilSocial: payload.profile.social,
      topCarreras: payload.topCareers,
      resultadosCompletos: payload.resultadosCompletos,
      scoreGlobal: payload.scoreGlobal,
      zonaIkigai: payload.zonaIkigai,
    },
  });

  return result;
};

interface SubmitKnowledgePayload {
  testId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

export const submitKnowledgeService = async (
  userId: string,
  payload: SubmitKnowledgePayload,
) => {
  const test = await prisma.test.findUnique({
    where: { id: payload.testId, type: "KNOWLEDGE", status: "ACTIVE" },
  });

  if (!test) throw new Error("Test no encontrado");

  const result = await prisma.knowledgeTestResult.create({
    data: {
      userId,
      testId: payload.testId,
      score: payload.score,
      correctAnswers: payload.correctAnswers,
      totalQuestions: payload.totalQuestions,
    },
  });

  return result;
};

export const getUserResultsService = async (userId: string) => {
  const [vocalResults, knowledgeResults] = await Promise.all([
    prisma.vocalTestResult.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.knowledgeTestResult.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const all = [
    ...vocalResults.map((r) => ({ ...r, resultType: "vocational" as const })),
    ...knowledgeResults.map((r) => ({
      ...r,
      resultType: "knowledge" as const,
    })),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return all;
};

export const getLatestVocationalResultService = async (userId: string) => {
  const result = await prisma.vocalTestResult.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return result ?? null;
};
