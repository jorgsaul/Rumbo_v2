import prisma from "../lib/prisma";
import { sanitizeHtml } from "../lib/sanitize";
import { createNotificationService } from "./notification.service";

export const getTopForumsService = async () => {
  return prisma.forum.findMany({
    where: { isActive: true },
    orderBy: { posts: { _count: "desc" } },
    take: 5,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      _count: { select: { posts: true } },
    },
  });
};

export const getForumsService = async (userId: string) => {
  const forums = await prisma.forum.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { posts: true, members: true } },
      createdBy: { select: { id: true, username: true } },
      members: {
        where: { userId },
        select: { userId: true },
      },
    },
  });

  return forums.map((f) => ({
    ...f,
    isMember: f.members.length > 0,
    members: undefined,
  }));
};

export const getForumByIdService = async (forumId: string, userId: string) => {
  const forum = await prisma.forum.findUnique({
    where: { id: forumId },
    include: {
      _count: { select: { posts: true, members: true } },
      createdBy: { select: { id: true, username: true } },
      members: {
        where: { userId },
        select: { userId: true },
      },
    },
  });

  if (!forum) throw new Error("Foro no encontrado");

  return {
    ...forum,
    isMember: forum.members.length > 0,
    members: undefined,
  };
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
    forumId: post.forumId,
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
  const cleanName = sanitizeHtml(data.name);
  const cleanDescription = data.description
    ? sanitizeHtml(data.description)
    : undefined;
  const existing = await prisma.forumRequest.findFirst({
    where: { userId, name: data.name, status: "PENDING" },
  });
  if (existing)
    throw new Error("Ya tienes una solicitud pendiente con ese nombre");

  return prisma.forumRequest.create({
    data: { userId, name: cleanName, description: cleanDescription },
  });
};

export const joinForumService = async (userId: string, forumId: string) => {
  const existing = await prisma.forumMember.findUnique({
    where: { userId_forumId: { userId, forumId } },
  });

  if (existing) {
    await prisma.forumMember.delete({
      where: { userId_forumId: { userId, forumId } },
    });
    return { isMember: false };
  }

  await prisma.forumMember.create({
    data: { userId, forumId },
  });
  return { isMember: true };
};

export const getMyForumsService = async (userId: string) => {
  return prisma.forumMember.findMany({
    where: { userId },
    include: {
      forum: {
        include: {
          _count: { select: { posts: true, members: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const updateForumService = async (
  forumId: string,
  userId: string,
  data: { name?: string; description?: string },
) => {
  const forum = await prisma.forum.findUnique({ where: { id: forumId } });
  if (!forum) throw new Error("Foro no encontrado");
  if (forum.createdById !== userId) throw new Error("No tienes permiso");

  return prisma.forum.update({
    where: { id: forumId },
    data,
  });
};

export const updateForumImageService = async (
  forumId: string,
  userId: string,
  buffer: Buffer,
  type: "image" | "banner",
) => {
  const forum = await prisma.forum.findUnique({ where: { id: forumId } });
  if (!forum) throw new Error("Foro no encontrado");
  if (forum.createdById !== userId) throw new Error("No tienes permiso");

  const { uploadImageService, deleteImageService } =
    await import("./upload.service");

  const oldPublicId =
    type === "image" ? forum.imagePublicId : forum.bannerPublicId;
  if (oldPublicId) await deleteImageService(oldPublicId);

  const folder = `rumbo/forums/${type}`;
  const result = await uploadImageService(buffer, folder);

  return prisma.forum.update({
    where: { id: forumId },
    data:
      type === "image"
        ? { imageUrl: result.url, imagePublicId: result.publicId }
        : { bannerUrl: result.url, bannerPublicId: result.publicId },
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

  await createNotificationService(
    request.userId,
    "FORUM_REQUEST",
    action === "APPROVED" ? "Foro aprobado" : "Foro rechazado",
    action === "APPROVED"
      ? `Tu solicitud para crear "${request.name}" fue aprobada`
      : `Tu solicitud para crear "${request.name}" fue rechazada`,
    action === "APPROVED" ? "/foros" : undefined,
  );
};

export const adminToggleForumService = async (forumId: string) => {
  const forum = await prisma.forum.findUnique({ where: { id: forumId } });
  if (!forum) throw new Error("Foro no encontrado");
  return prisma.forum.update({
    where: { id: forumId },
    data: { isActive: !forum.isActive },
  });
};
