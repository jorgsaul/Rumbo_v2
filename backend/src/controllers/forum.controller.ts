import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  getForumsService,
  getForumByIdService,
  getForumPostsService,
  createForumRequestService,
  adminGetForumRequestsService,
  adminResolveForumRequestService,
  adminToggleForumService,
  getMyForumsService,
  joinForumService,
  updateForumImageService,
  updateForumService,
  getTopForumsService,
} from "../services/forum.service";

export const getTopForums = async (req: AuthRequest, res: Response) => {
  try {
    const forums = await getTopForumsService();
    res.json({ ok: true, response: forums });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const getForums = async (req: AuthRequest, res: Response) => {
  try {
    const forums = await getForumsService(req.userId!);
    res.json({ ok: true, response: forums });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const getForumById = async (req: AuthRequest, res: Response) => {
  try {
    const forum = await getForumByIdService(
      req.params.forumId as string,
      req.userId!,
    );
    res.json({ ok: true, response: forum });
  } catch (error: any) {
    res.status(404).json({ ok: false, message: error.message });
  }
};

export const updateForum = async (req: AuthRequest, res: Response) => {
  try {
    const forum = await updateForumService(
      req.params.forumId as string,
      req.userId!,
      req.body,
    );
    res.json({ ok: true, response: forum });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const updateForumImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) throw new Error("No se recibió imagen");
    const type = req.query.type as "image" | "banner";
    const forum = await updateForumImageService(
      req.params.forumId as string,
      req.userId!,
      req.file.buffer,
      type,
    );
    res.json({ ok: true, response: forum });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const joinForum = async (req: AuthRequest, res: Response) => {
  try {
    const result = await joinForumService(
      req.userId!,
      req.params.forumId as string,
    );
    res.json({ ok: true, response: result });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const getMyForums = async (req: AuthRequest, res: Response) => {
  try {
    const forums = await getMyForumsService(req.userId!);
    res.json({ ok: true, response: forums });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const getForumPosts = async (req: AuthRequest, res: Response) => {
  try {
    const posts = await getForumPostsService(
      req.params.forumId as string,
      req.userId!,
    );
    res.json({ ok: true, response: posts });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const createForumRequest = async (req: AuthRequest, res: Response) => {
  try {
    const request = await createForumRequestService(req.userId!, req.body);
    res.status(201).json({ ok: true, response: request });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const adminGetForumRequests = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const requests = await adminGetForumRequestsService(
      req.query.status as string,
    );
    res.json({ ok: true, response: requests });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const adminResolveForumRequest = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    await adminResolveForumRequestService(
      req.params.requestId as string,
      req.body.action,
      req.userId!,
    );
    res.json({ ok: true, message: "Solicitud procesada" });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const adminToggleForum = async (req: AuthRequest, res: Response) => {
  try {
    const forum = await adminToggleForumService(req.params.forumId as string);
    res.json({ ok: true, response: forum });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};
