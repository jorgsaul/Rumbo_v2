import prisma from "../lib/prisma";
import type { IkigaiZone } from "@prisma/client";
import { uploadImageService } from "./upload.service";

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

export const getUserResultsService = async (
  userId: string,
  requestingUserId: string,
) => {
  if (userId !== requestingUserId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isPrivate: true },
    });
    if (user?.isPrivate) throw new Error("Este perfil es privado");
  }

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

export const getVocalResultByIdService = async (
  resultId: string,
  requestingUserId: string,
) => {
  const result = await prisma.vocalTestResult.findUnique({
    where: { id: resultId },
    include: {
      user: {
        select: { isPrivate: true, id: true },
      },
    },
  });

  if (!result) throw new Error("Resultado no encontrado");
  if (result.userId === requestingUserId) return result;
  if (result.user.isPrivate) throw new Error("Este perfil es privado");

  return result;
};

export const getMyVocationalResultService = async (
  userId: string,
  testId: string,
) => {
  return prisma.vocalTestResult.findFirst({
    where: { userId, testId },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteMyVocationalResultService = async (
  userId: string,
  testId: string,
) => {
  await prisma.vocalTestResult.deleteMany({
    where: { userId, testId },
  });
};

//ADMIN

export const adminGetTestsService = async () => {
  return prisma.test.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      type: true,
      status: true,
      estimatedMinutes: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: { questions: true, vocalResults: true, knowledgeResults: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const adminCreateTestService = async (data: {
  title: string;
  description?: string;
  type: "VOCATIONAL" | "KNOWLEDGE";
  estimatedMinutes?: number;
}) => {
  return prisma.test.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      estimatedMinutes: data.estimatedMinutes ?? 15,
      status: "DRAFT",
    },
    select: {
      id: true,
      title: true,
      description: true,
      type: true,
      status: true,
      estimatedMinutes: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: { questions: true, vocalResults: true, knowledgeResults: true },
      },
    },
  });
};

export const adminUpdateTestService = async (
  testId: string,
  data: {
    title?: string;
    description?: string;
    status?: "DRAFT" | "ACTIVE" | "INACTIVE";
    estimatedMinutes?: number;
  },
) => {
  return prisma.test.update({
    where: { id: testId },
    data,
    select: {
      id: true,
      title: true,
      description: true,
      type: true,
      status: true,
      estimatedMinutes: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: { questions: true, vocalResults: true, knowledgeResults: true },
      },
    },
  });
};

export const adminDeleteTestService = async (testId: string) => {
  await prisma.vocalTestResult.deleteMany({ where: { testId } });
  await prisma.knowledgeTestResult.deleteMany({ where: { testId } });
  return prisma.test.delete({ where: { id: testId } });
};

export const adminGetStatsService = async () => {
  const [totalUsers, totalTests, totalVocational, totalKnowledge] =
    await Promise.all([
      prisma.user.count(),
      prisma.test.count(),
      prisma.vocalTestResult.count(),
      prisma.knowledgeTestResult.count(),
    ]);

  const testStats = await prisma.test.findMany({
    select: {
      id: true,
      title: true,
      type: true,
      _count: { select: { vocalResults: true, knowledgeResults: true } },
    },
  });

  return { totalUsers, totalTests, totalVocational, totalKnowledge, testStats };
};

export const adminGetTestByIdService = async (testId: string) => {
  const test = await prisma.test.findUnique({
    where: { id: testId },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: {
          options: { orderBy: { order: "asc" } },
        },
      },
    },
  });
  if (!test) throw new Error("Test no encontrado");
  return test;
};

export const adminUpsertQuestionsService = async (
  testId: string,
  questions: {
    id?: string;
    text: string;
    order: number;
    pilar?: string;
    imageUrl?: string;
    statements?: any;
    options: {
      id?: string;
      label: string;
      text: string;
      isCorrect: boolean;
      order: number;
      imageUrl?: string;
    }[];
  }[],
) => {
  const incomingIds = questions.filter((q) => q.id).map((q) => q.id!);
  await prisma.question.deleteMany({
    where: { testId, id: { notIn: incomingIds } },
  });

  for (const q of questions) {
    if (q.id) {
      await prisma.question.update({
        where: { id: q.id },
        data: {
          text: q.text,
          order: q.order,
          pilar: (q.pilar as any) ?? null,
          imageUrl: q.imageUrl ?? null,
          statements: q.statements ?? {},
        },
      });

      const incomingOptionIds = q.options.filter((o) => o.id).map((o) => o.id!);
      await prisma.option.deleteMany({
        where: { questionId: q.id, id: { notIn: incomingOptionIds } },
      });

      for (const opt of q.options) {
        if (opt.id) {
          await prisma.option.update({
            where: { id: opt.id },
            data: {
              label: opt.label,
              text: opt.text,
              isCorrect: opt.isCorrect,
              order: opt.order,
              imageUrl: opt.imageUrl ?? null,
            },
          });
        } else {
          await prisma.option.create({
            data: {
              questionId: q.id,
              label: opt.label,
              text: opt.text,
              isCorrect: opt.isCorrect,
              order: opt.order,
              imageUrl: opt.imageUrl ?? null,
            },
          });
        }
      }
    } else {
      await prisma.question.create({
        data: {
          testId,
          text: q.text,
          order: q.order,
          pilar: (q.pilar as any) ?? null,
          imageUrl: q.imageUrl ?? null,
          statements: q.statements ?? {},
          options: {
            create: q.options.map((opt) => ({
              label: opt.label,
              text: opt.text,
              isCorrect: opt.isCorrect,
              order: opt.order,
              imageUrl: opt.imageUrl ?? null,
            })),
          },
        },
      });
    }
  }

  return adminGetTestByIdService(testId);
};

export const uploadTestImageService = async (
  buffer: Buffer,
  folder: "questions" | "options",
): Promise<{ url: string; publicId: string }> => {
  return uploadImageService(buffer, `rumbo/tests/${folder}`);
};
