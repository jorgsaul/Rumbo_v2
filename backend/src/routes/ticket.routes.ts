import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/auth.middleware";
import {
  createTicket,
  getMyTickets,
  adminGetTickets,
  adminUpdateTicket,
} from "../controllers/ticket.controller";

const router = Router();

router.post("/", authMiddleware, createTicket);
router.get("/my", authMiddleware, getMyTickets);
router.get("/admin", authMiddleware, adminMiddleware, adminGetTickets);
router.patch(
  "/admin/:ticketId",
  authMiddleware,
  adminMiddleware,
  adminUpdateTicket,
);

export default router;
