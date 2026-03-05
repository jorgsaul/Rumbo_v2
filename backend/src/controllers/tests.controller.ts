import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  getTestsService,
  getTestByIdService,
  submitVocationalService,
  submitKnowledgeService,
  getUserResultsService,
  getLatestVocationalResultService,
  adminCreateTestService,
  adminDeleteTestService,
  adminGetStatsService,
  adminGetTestsService,
  adminUpdateTestService,
  adminGetTestByIdService,
  adminUpsertQuestionsService,
  getVocalResultByIdService,
  deleteMyVocationalResultService,
  getMyVocationalResultService,
  uploadTestImageService,
} from "../services/tests.service";

export const getTests = async (req: AuthRequest, res: Response) => {
  try {
    const tests = await getTestsService();
    res.json({ ok: true, response: tests });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const getTestById = async (req: AuthRequest, res: Response) => {
  try {
    const test = await getTestByIdService(req.params.testId as string);
    res.json({ ok: true, response: test });
  } catch (error: any) {
    const status = error.message === "Test no encontrado" ? 404 : 500;
    res.status(status).json({ ok: false, message: error.message });
  }
};

export const submitVocational = async (req: AuthRequest, res: Response) => {
  try {
    const result = await submitVocationalService(req.userId!, req.body);
    res.status(201).json({ ok: true, response: result });
  } catch (error: any) {
    const status = error.message === "Test no encontrado" ? 404 : 500;
    res.status(status).json({ ok: false, message: error.message });
  }
};

export const submitKnowledge = async (req: AuthRequest, res: Response) => {
  try {
    const result = await submitKnowledgeService(req.userId!, req.body);
    res.status(201).json({ ok: true, response: result });
  } catch (error: any) {
    const status = error.message === "Test no encontrado" ? 404 : 500;
    res.status(status).json({ ok: false, message: error.message });
  }
};

export const getUserResults = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await getUserResultsService(userId as string);
    res.json({ ok: true, response: data });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const getLatestVocationalResult = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const result = await getLatestVocationalResultService(req.userId!);
    res.json({ ok: true, response: result });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const getVocalResultById = async (req: AuthRequest, res: Response) => {
  try {
    const result = await getVocalResultByIdService(
      req.params.resultId as string,
      req.userId!,
    );
    res.json({ ok: true, response: result });
  } catch (error: any) {
    const status = error.message === "No autorizado" ? 403 : 404;
    res.status(status).json({ ok: false, message: error.message });
  }
};

export const getMyVocationalResult = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const result = await getMyVocationalResultService(
      req.userId!,
      req.params.testId as string,
    );
    res.json({ ok: true, response: result });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const deleteMyVocationalResult = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    await deleteMyVocationalResultService(
      req.userId!,
      req.params.testId as string,
    );
    res.json({ ok: true, response: null });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

//ADMIN
export const adminGetTests = async (req: AuthRequest, res: Response) => {
  try {
    const tests = await adminGetTestsService();
    res.json({ ok: true, response: tests });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const adminCreateTest = async (req: AuthRequest, res: Response) => {
  try {
    const test = await adminCreateTestService(req.body);
    res.status(201).json({ ok: true, response: test });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const adminUpdateTest = async (req: AuthRequest, res: Response) => {
  try {
    const test = await adminUpdateTestService(
      req.params.testId as string,
      req.body,
    );
    res.json({ ok: true, response: test });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const adminDeleteTest = async (req: AuthRequest, res: Response) => {
  try {
    await adminDeleteTestService(req.params.testId as string);
    res.json({ ok: true, message: "Test eliminado" });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const adminGetStats = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await adminGetStatsService();
    res.json({ ok: true, response: stats });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const adminGetTestById = async (req: AuthRequest, res: Response) => {
  try {
    const test = await adminGetTestByIdService(req.params.testId as string);
    res.json({ ok: true, response: test });
  } catch (error: any) {
    res.status(404).json({ ok: false, message: error.message });
  }
};

export const adminUpsertQuestions = async (req: AuthRequest, res: Response) => {
  try {
    const test = await adminUpsertQuestionsService(
      req.params.testId as string,
      req.body.questions,
    );
    res.json({ ok: true, response: test });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const uploadTestImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) throw new Error("No se recibió imagen");
    const folder = (req.query.folder as "questions" | "options") ?? "questions";
    const result = await uploadTestImageService(req.file.buffer, folder);
    res.json({ ok: true, response: result });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};
