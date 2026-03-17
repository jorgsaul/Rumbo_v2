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
} from "../services/forum.service";

export const getForums = async (req: Request, res: Response) => {
  try {
    const forums = await getForumsService();
    res.json({ ok: true, response: forums });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const getForumById = async (req: Request, res: Response) => {
  try {
    const forum = await getForumByIdService(req.params.forumId as string);
    res.json({ ok: true, response: forum });
  } catch (error: any) {
    res.status(404).json({ ok: false, message: error.message });
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
