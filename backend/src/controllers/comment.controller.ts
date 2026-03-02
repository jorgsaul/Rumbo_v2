import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  getCommentsService,
  createCommentService,
  deleteCommentService,
} from "../services/comment.service";

export const getComments = async (req: AuthRequest, res: Response) => {
  try {
    const comments = await getCommentsService(req.params.postId as string);
    res.json({ ok: true, response: comments });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const comment = await createCommentService(
      req.userId!,
      req.params.postId as string,
      req.body.content,
    );
    res.status(201).json({ ok: true, response: comment });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
  try {
    await deleteCommentService(req.userId!, req.params.commentId as string);
    res.json({ ok: true, message: "Comentario eliminado" });
  } catch (error: any) {
    res.status(403).json({ ok: false, message: error.message });
  }
};
