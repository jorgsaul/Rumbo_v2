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
  joinForum,
  getMyForums,
  updateForum,
  updateForumImage,
} from "../controllers/forum.controller";

import { upload } from "../lib/multer";

const router = Router();

router.patch("/:forumId", authMiddleware, updateForum);
router.post(
  "/:forumId/image",
  authMiddleware,
  upload.single("image"),
  updateForumImage,
);

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

router.post("/:forumId/join", authMiddleware, joinForum);
router.get("/my", authMiddleware, getMyForums);

router.get("/", authMiddleware, getForums);
router.get("/:forumId", authMiddleware, getForumById);
router.get("/:forumId/posts", authMiddleware, getForumPosts);
router.post("/requests", authMiddleware, createForumRequest);

export default router;
