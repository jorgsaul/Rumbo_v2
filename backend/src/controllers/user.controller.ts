import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  getMeService,
  updateProfileService,
  getUserCommentsService,
  getUserLikesService,
  getUserPostsService,
  getUserSavedService,
  getUserByUsernameService,
  followUserService,
  searchUsersService,
  updateAvatarService,
  updateBannerService,
  adminGetUsersService,
  adminUpdateUserService,
} from "../services/user.service";

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getMeService(req.userId!);
    res.json({ ok: true, response: user });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await updateProfileService(req.userId!, req.body);
    res.json({ ok: true, response: user });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const getUserPosts = async (req: AuthRequest, res: Response) => {
  try {
    const posts = await getUserPostsService(
      req.userId!,
      req.params.userId as string,
    );
    res.json({ ok: true, response: posts });
  } catch (error: any) {
    const status = error.message === "Perfil privado" ? 403 : 500;
    res.status(status).json({ ok: false, message: error.message });
  }
};

export const getUserLikes = async (req: AuthRequest, res: Response) => {
  try {
    const posts = await getUserLikesService(
      req.userId!,
      req.params.userId as string,
    );
    res.json({ ok: true, response: posts });
  } catch (error: any) {
    const status = error.message === "Perfil privado" ? 403 : 500;
    res.status(status).json({ ok: false, message: error.message });
  }
};

export const getUserSaved = async (req: AuthRequest, res: Response) => {
  try {
    const posts = await getUserSavedService(
      req.userId!,
      req.params.userId as string,
    );
    res.json({ ok: true, response: posts });
  } catch (error: any) {
    const status = error.message === "Perfil privado" ? 403 : 500;
    res.status(status).json({ ok: false, message: error.message });
  }
};

export const getUserComments = async (req: AuthRequest, res: Response) => {
  try {
    const comments = await getUserCommentsService(
      req.userId!,
      req.params.userId as string,
    );
    res.json({ ok: true, response: comments });
  } catch (error: any) {
    const status = error.message === "Perfil privado" ? 403 : 500;
    res.status(status).json({ ok: false, message: error.message });
  }
};

export const getUserByUsername = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getUserByUsernameService(
      req.params.username as string,
      req.userId!,
    );
    res.json({ ok: true, response: user });
  } catch (error: any) {
    res.status(404).json({ ok: false, message: error.message });
  }
};

export const followUser = async (req: AuthRequest, res: Response) => {
  try {
    const result = await followUserService(
      req.userId!,
      req.params.userId as string,
    );
    res.json({ ok: true, response: result });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const searchUsers = async (req: AuthRequest, res: Response) => {
  try {
    const q = req.query.q as string;
    const users = await searchUsersService(q);
    res.json({ ok: true, response: users });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const updateAvatar = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) throw new Error("No se recibió imagen");
    const result = await updateAvatarService(req.userId!, req.file.buffer);
    res.json({ ok: true, response: result });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const updateBanner = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) throw new Error("No se recibió imagen");
    const result = await updateBannerService(req.userId!, req.file.buffer);
    res.json({ ok: true, response: result });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const adminGetUsers = async (req: AuthRequest, res: Response) => {
  try {
    const search = req.query.search as string | undefined;
    const users = await adminGetUsersService(search);
    res.json({ ok: true, response: users });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const adminUpdateUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await adminUpdateUserService(
      req.params.userId as string,
      req.body,
    );
    res.json({ ok: true, response: user });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};
