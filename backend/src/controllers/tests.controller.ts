import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  getTestsService,
  getTestByIdService,
  submitVocationalService,
  submitKnowledgeService,
  getUserResultsService,
  getLatestVocationalResultService,
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
