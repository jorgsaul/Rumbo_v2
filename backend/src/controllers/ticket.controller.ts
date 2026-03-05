import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createTicketService,
  getMyTicketsService,
  adminGetTicketsService,
  adminUpdateTicketService,
} from "../services/ticket.service";

export const createTicket = async (req: AuthRequest, res: Response) => {
  try {
    const ticket = await createTicketService(req.userId!, req.body);
    res.status(201).json({ ok: true, response: ticket });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

export const getMyTickets = async (req: AuthRequest, res: Response) => {
  try {
    const tickets = await getMyTicketsService(req.userId!);
    res.json({ ok: true, response: tickets });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const adminGetTickets = async (req: AuthRequest, res: Response) => {
  try {
    const status = req.query.status as string | undefined;
    const tickets = await adminGetTicketsService(status);
    res.json({ ok: true, response: tickets });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const adminUpdateTicket = async (req: AuthRequest, res: Response) => {
  try {
    const ticket = await adminUpdateTicketService(
      req.params.ticketId as string,
      req.body,
    );
    res.json({ ok: true, response: ticket });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};
