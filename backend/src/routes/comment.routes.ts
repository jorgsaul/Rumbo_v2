import { Router } from "express";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/comment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/:postId/comments", authMiddleware, getComments);
router.post("/:postId/comments", authMiddleware, createComment);
router.delete("/:postId/comments/:commentId", authMiddleware, deleteComment);

export default router;
