import { Router } from "express";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware";
import {
  getForums,
  getForumById,
  getForumPosts,
  createForumRequest,
  adminGetForumRequests,
  adminResolveForumRequest,
  adminToggleForum,
} from "../controllers/forum.controller";

const router = Router();

router.get("/", authMiddleware, getForums);
router.get("/:forumId", authMiddleware, getForumById);
router.get("/:forumId/posts", authMiddleware, getForumPosts);
router.post("/requests", authMiddleware, createForumRequest);
router.get(
  "/admin/requests",
  authMiddleware,
  adminMiddleware,
  adminGetForumRequests,
);
router.patch(
  "/admin/requests/:requestId",
  authMiddleware,
  adminMiddleware,
  adminResolveForumRequest,
);
router.patch(
  "/admin/:forumId/toggle",
  authMiddleware,
  adminMiddleware,
  adminToggleForum,
);

export default router;
