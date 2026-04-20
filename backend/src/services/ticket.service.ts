import prisma from "../lib/prisma";
import { sanitizeHtml } from "../lib/sanitize";

export const createTicketService = async (
  userId: string,
  data: { title: string; description: string; category: string },
) => {
  const cleanTitle = sanitizeHtml(data.title);
  const cleanDescription = sanitizeHtml(data.description);

  return prisma.ticket.create({
    data: {
      userId,
      title: cleanTitle,
      description: cleanDescription,
      category: data.category as any,
    },
  });
};

export const getMyTicketsService = async (userId: string) => {
  return prisma.ticket.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const adminGetTicketsService = async (status?: string) => {
  return prisma.ticket.findMany({
    where: status ? { status: status as any } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, username: true, avatarUrl: true, email: true },
      },
    },
  });
};

export const adminUpdateTicketService = async (
  ticketId: string,
  data: { status?: string; adminReply?: string },
) => {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: data.status as any,
      adminReply: data.adminReply,
    },
  });
};
