import { Router } from "express";
import {
  getPosts,
  likePost,
  savePost,
  reportPost,
  createPost,
  getTags,
  deletePost,
  searchPosts,
} from "../controllers/feed.controller";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/comment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/tags", getTags);
router.get("/", authMiddleware, getPosts);
router.delete("/:postId", authMiddleware, deletePost);
router.post("/:postId/like", authMiddleware, likePost);
router.post("/:postId/save", authMiddleware, savePost);
router.post("/:postId/report", authMiddleware, reportPost);
router.get("/:postId/comments", authMiddleware, getComments);
router.post("/:postId/comments", authMiddleware, createComment);
router.delete("/:postId/comments/:commentId", authMiddleware, deleteComment);
router.post("/", authMiddleware, createPost);
router.get("/search", authMiddleware, searchPosts);

export default router;
