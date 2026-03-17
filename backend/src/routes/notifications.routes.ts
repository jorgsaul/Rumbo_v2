import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getMyNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from "../controllers/notification.controller";

const router = Router();

router.get("/", authMiddleware, getMyNotifications);
router.get("/unread", authMiddleware, getUnreadCount);
router.patch("/:notificationId/read", authMiddleware, markAsRead);
router.patch("/read-all", authMiddleware, markAllAsRead);

export default router;
