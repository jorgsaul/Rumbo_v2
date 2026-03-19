import { Router } from "express";
import { upload } from "../lib/multer";
import {
  getPosts,
  likePost,
  savePost,
  reportPost,
  createPost,
  getTags,
  deletePost,
  searchPosts,
  uploadPostImage,
  adminGetModerationStats,
  adminGetReports,
  adminModeratePost,
  getPostById,
  getPersonalizedFeed,
} from "../controllers/feed.controller";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/comment.controller";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware";

const router = Router();

router.get("/tags", getTags);
router.get("/personalized", authMiddleware, getPersonalizedFeed);
router.get("/search", authMiddleware, searchPosts);
router.post(
  "/upload-image",
  authMiddleware,
  upload.single("image"),
  uploadPostImage,
);

// Admin
router.get("/admin/reports", authMiddleware, adminMiddleware, adminGetReports);
router.get(
  "/admin/moderation/stats",
  authMiddleware,
  adminMiddleware,
  adminGetModerationStats,
);
router.patch(
  "/admin/posts/:postId/moderate",
  authMiddleware,
  adminMiddleware,
  adminModeratePost,
);

// Rutas con parámetros
router.get("/", authMiddleware, getPosts);
router.post("/", authMiddleware, createPost);
router.get("/:postId", authMiddleware, getPostById);
router.delete("/:postId", authMiddleware, deletePost);
router.post("/:postId/like", authMiddleware, likePost);
router.post("/:postId/save", authMiddleware, savePost);
router.post("/:postId/report", authMiddleware, reportPost);
router.get("/:postId/comments", authMiddleware, getComments);
router.post("/:postId/comments", authMiddleware, createComment);
router.delete("/:postId/comments/:commentId", authMiddleware, deleteComment);
export default router;
