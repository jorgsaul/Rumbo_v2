import prisma from "../lib/prisma";
import { createNotificationService } from "./notification.service";
import { sanitizeHtml } from "../lib/sanitize";

export const getCommentsService = async (postId: string) => {
  return prisma.comment.findMany({
    where: { postId, isHidden: false, parentId: null },
    orderBy: { createdAt: "asc" },
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
      replies: {
        where: { isHidden: false },
        orderBy: { createdAt: "asc" },
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
        },
      },
      _count: { select: { replies: true } },
    },
  });
};

export const createCommentService = async (
  authorId: string,
  postId: string,
  content: string,
  parentId?: string,
) => {
  if (!content?.trim()) throw new Error("El comentario no puede estar vacío");

  const cleanContent = sanitizeHtml(content);

  const postData = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true, forumId: true },
  });

  if (postData && postData.authorId !== authorId) {
    await createNotificationService(
      postData.authorId,
      "POST_COMMENT",
      "Nuevo comentario",
      `Alguien comentó tu publicación`,
      `/foros/${postData.forumId ?? "general"}/${postId}`,
    );
  }

  if (parentId) {
    const parentComment = await prisma.comment.findUnique({
      where: { id: parentId },
      select: { authorId: true },
    });
    if (parentComment && parentComment.authorId !== authorId) {
      await createNotificationService(
        parentComment.authorId,
        "COMMENT_REPLY",
        "Nueva respuesta",
        `Alguien respondió tu comentario`,
        `/foros/${postData?.forumId ?? "general"}/${postId}`,
      );
    }
  }

  return prisma.comment.create({
    data: {
      authorId,
      postId,
      content: cleanContent,
      parentId: parentId ?? null,
    },
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
      replies: true,
      _count: { select: { replies: true } },
    },
  });
};

export const deleteCommentService = async (
  userId: string,
  commentId: string,
) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) throw new Error("Comentario no encontrado");
  if (comment.authorId !== userId)
    throw new Error("No tienes permiso para eliminar este comentario");

  await prisma.comment.delete({ where: { id: commentId } });
};
