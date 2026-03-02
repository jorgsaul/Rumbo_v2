import { Router } from "express";
import {
  getTests,
  getTestById,
  submitVocational,
  submitKnowledge,
  getUserResults,
  getLatestVocationalResult,
} from "../controllers/tests.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/results/:userId", authMiddleware, getUserResults);
router.get("/vocational/latest", authMiddleware, getLatestVocationalResult);
router.post("/vocational/submit", authMiddleware, submitVocational);
router.post("/knowledge/submit", authMiddleware, submitKnowledge);
router.get("/", authMiddleware, getTests);
router.get("/:testId", authMiddleware, getTestById);

export default router;
