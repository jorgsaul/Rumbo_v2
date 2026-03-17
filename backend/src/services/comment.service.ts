import prisma from "../lib/prisma";

export const getCommentsService = async (postId: string) => {
  return prisma.comment.findMany({
    where: { postId, isHidden: false, parentId: null }, // solo comentarios raíz
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

  return prisma.comment.create({
    data: {
      authorId,
      postId,
      content: content.trim(),
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
