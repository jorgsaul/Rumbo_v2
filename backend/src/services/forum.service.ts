import prisma from "../lib/prisma";

export const getForumsService = async () => {
  return prisma.forum.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { posts: true } },
      createdBy: { select: { id: true, username: true } },
    },
  });
};

export const getForumByIdService = async (forumId: string) => {
  const forum = await prisma.forum.findUnique({
    where: { id: forumId },
    include: {
      _count: { select: { posts: true } },
      createdBy: { select: { id: true, username: true } },
    },
  });
  if (!forum) throw new Error("Foro no encontrado");
  return forum;
};

export const getForumPostsService = async (forumId: string, userId: string) => {
  const posts = await prisma.post.findMany({
    where: { forumId, isHidden: false },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          fullName: true,
          avatarUrl: true,
          role: true,
        },
      },
      tags: {
        include: {
          tag: { include: { category: { select: { color: true } } } },
        },
      },
      _count: { select: { likes: true, comments: true } },
      likes: { where: { userId }, select: { userId: true } },
      favorites: { where: { userId }, select: { userId: true } },
      reports: { where: { reporterId: userId }, select: { reporterId: true } },
    },
  });

  return posts.map((post) => ({
    id: post.id,
    author: post.author,
    title: post.title,
    content: post.content,
    mediaUrl: post.mediaUrl,
    tags: post.tags.map((pt) => ({
      name: pt.tag.name,
      color: pt.tag.category?.color ?? "#6b7280",
    })),
    likes: post._count.likes,
    commentsCount: post._count.comments,
    isLiked: post.likes.length > 0,
    isSaved: post.favorites.length > 0,
    isReported: post.reports.length > 0,
    createdAt: post.createdAt,
    moderation: post.moderation,
  }));
};

export const createForumRequestService = async (
  userId: string,
  data: { name: string; description?: string },
) => {
  const existing = await prisma.forumRequest.findFirst({
    where: { userId, name: data.name, status: "PENDING" },
  });
  if (existing)
    throw new Error("Ya tienes una solicitud pendiente con ese nombre");

  return prisma.forumRequest.create({
    data: { userId, name: data.name, description: data.description },
  });
};

// ADMIN
export const adminGetForumRequestsService = async (status?: string) => {
  return prisma.forumRequest.findMany({
    where: status ? { status: status as any } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, username: true, avatarUrl: true } },
    },
  });
};

export const adminResolveForumRequestService = async (
  requestId: string,
  action: "APPROVED" | "REJECTED",
  adminId: string,
) => {
  const request = await prisma.forumRequest.findUnique({
    where: { id: requestId },
  });
  if (!request) throw new Error("Solicitud no encontrada");

  await prisma.forumRequest.update({
    where: { id: requestId },
    data: { status: action },
  });

  if (action === "APPROVED") {
    await prisma.forum.create({
      data: {
        name: request.name,
        description: request.description,
        createdById: adminId,
      },
    });
  }
};

export const adminToggleForumService = async (forumId: string) => {
  const forum = await prisma.forum.findUnique({ where: { id: forumId } });
  if (!forum) throw new Error("Foro no encontrado");
  return prisma.forum.update({
    where: { id: forumId },
    data: { isActive: !forum.isActive },
  });
};
