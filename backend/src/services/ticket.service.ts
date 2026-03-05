import prisma from "../lib/prisma";

export const createTicketService = async (
  userId: string,
  data: { title: string; description: string; category: string },
) => {
  return prisma.ticket.create({
    data: {
      userId,
      title: data.title,
      description: data.description,
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
