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
} from "../services/feed.service";

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
    const { reason } = req.body;
    await reportPostService(req.userId!, req.params.postId as string, reason);
    res.json({ ok: true, message: "Reporte enviado" });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
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
