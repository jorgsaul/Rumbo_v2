import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  getMyNotificationsService,
  markAsReadService,
  markAllAsReadService,
  getUnreadCountService,
} from "../services/notification.service";

export const getMyNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await getMyNotificationsService(req.userId!);
    res.json({ ok: true, response: notifications });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const getUnreadCount = async (req: AuthRequest, res: Response) => {
  try {
    const count = await getUnreadCountService(req.userId!);
    res.json({ ok: true, response: count });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    await markAsReadService(req.userId!, req.params.notificationId as string);
    res.json({ ok: true });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const markAllAsRead = async (req: AuthRequest, res: Response) => {
  try {
    await markAllAsReadService(req.userId!);
    res.json({ ok: true });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};
