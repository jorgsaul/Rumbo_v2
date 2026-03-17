import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  getPostsService,
  likePostService,
  savePostService,
  reportPostService,
  createPostService,
  getTagsService,
  deletePostService,
  searchPostsService,
  uploadPostImageService,
  adminGetModerationStatsService,
  adminGetReportsService,
  adminModeratePostService,
  getPostByIdService,
} from "../services/feed.service";

export const getPostById = async (req: AuthRequest, res: Response) => {
  try {
    const post = await getPostByIdService(
      req.params.postId as string,
      req.userId!,
    );
    res.json({ ok: true, response: post });
  } catch (error: any) {
    res.status(404).json({ ok: false, message: error.message });
  }
};

export const getPosts = async (req: AuthRequest, res: Response) => {
  try {
    const tag = req.query.tag as string | undefined;
    const posts = await getPostsService(req.userId!, tag);
    res.json({ ok: true, response: posts });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const post = await createPostService(req.userId!, req.body);
    res.status(201).json({ ok: true, response: post });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    await deletePostService(req.userId!, req.params.postId as string);
    res.json({ ok: true, message: "Publicación eliminada" });
  } catch (error: any) {
    res.status(403).json({ ok: false, message: error.message });
  }
};

export const likePost = async (req: AuthRequest, res: Response) => {
  try {
    const result = await likePostService(
      req.userId!,
      req.params.postId as string,
    );
    res.json({ ok: true, response: result });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const savePost = async (req: AuthRequest, res: Response) => {
  try {
    const result = await savePostService(
      req.userId!,
      req.params.postId as string,
    );
    res.json({ ok: true, response: result });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const reportPost = async (req: AuthRequest, res: Response) => {
  try {
    await reportPostService(req.userId!, req.params.postId as string);
    res.json({ ok: true, message: "Reporte enviado" });
  } catch (error: any) {
    const status = error.status ?? 400;
    res.status(status).json({ ok: false, message: error.message });
  }
};

export const getTags = async (req: AuthRequest, res: Response) => {
  try {
    const tags = await getTagsService();
    res.json({ ok: true, response: tags });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const searchPosts = async (req: AuthRequest, res: Response) => {
  try {
    const q = typeof req.query.q === "string" ? req.query.q : "";
    const posts = await searchPostsService(req.userId!, q);
    res.json({ ok: true, response: posts });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const uploadPostImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) throw new Error("No se recibió imagen");
    const result = await uploadPostImageService(req.file.buffer);
    res.json({ ok: true, response: result });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

//ADMIN
export const adminGetReports = async (req: AuthRequest, res: Response) => {
  try {
    const reports = await adminGetReportsService();
    res.json({ ok: true, response: reports });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const adminModeratePost = async (req: AuthRequest, res: Response) => {
  try {
    const { action } = req.body;
    const result = await adminModeratePostService(
      req.params.postId as string,
      action,
    );
    res.json({ ok: true, response: result });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const adminGetModerationStats = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const stats = await adminGetModerationStatsService();
    res.json({ ok: true, response: stats });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};
