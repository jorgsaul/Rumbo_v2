import { Router } from "express";
import {
  getTests,
  getTestById,
  submitVocational,
  submitKnowledge,
  getUserResults,
  getLatestVocationalResult,
  adminCreateTest,
  adminDeleteTest,
  adminGetStats,
  adminGetTests,
  adminUpdateTest,
  adminGetTestById,
  adminUpsertQuestions,
  getVocalResultById,
  deleteMyVocationalResult,
  getMyVocationalResult,
  uploadTestImage,
} from "../controllers/tests.controller";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware";

import { upload } from "../lib/multer";

const router = Router();
//ADMIN ROUTES
router.get("/admin/stats", authMiddleware, adminMiddleware, adminGetStats);
router.get("/admin/tests", authMiddleware, adminMiddleware, adminGetTests);
router.post("/admin/tests", authMiddleware, adminMiddleware, adminCreateTest);
router.get("/vocational/result/:resultId", authMiddleware, getVocalResultById);
router.patch(
  "/admin/tests/:testId",
  authMiddleware,
  adminMiddleware,
  adminUpdateTest,
);
router.delete(
  "/admin/tests/:testId",
  authMiddleware,
  adminMiddleware,
  adminDeleteTest,
);
router.get(
  "/admin/tests/:testId",
  authMiddleware,
  adminMiddleware,
  adminGetTestById,
);
router.put(
  "/admin/tests/:testId/questions",
  authMiddleware,
  adminMiddleware,
  adminUpsertQuestions,
);
router.post(
  "/admin/upload-image",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  uploadTestImage,
);

//PUBLIC ROUTES
router.get("/results/:userId", authMiddleware, getUserResults);
router.get("/vocational/latest", authMiddleware, getLatestVocationalResult);
router.post("/vocational/submit", authMiddleware, submitVocational);
router.post("/knowledge/submit", authMiddleware, submitKnowledge);
router.get("/", authMiddleware, getTests);
router.get("/:testId/my-result", authMiddleware, getMyVocationalResult);
router.delete("/:testId/my-result", authMiddleware, deleteMyVocationalResult);
router.get("/:testId", authMiddleware, getTestById);

export default router;
