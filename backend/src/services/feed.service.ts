import prisma from "../lib/prisma";

export const getPostsService = async (
  userId: string,
  tag?: string,
  authorId?: string,
) => {
  const posts = await prisma.post.findMany({
    where: {
      isHidden: false,
      ...(tag && {
        tags: { some: { tag: { name: tag } } },
      }),
      ...(authorId && { authorId }),
    },
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
        include: { tag: true },
      },
      _count: {
        select: { likes: true, comments: true },
      },
      likes: {
        where: { userId },
        select: { userId: true },
      },
      favorites: {
        where: { userId },
        select: { userId: true },
      },
    },
  });

  return posts.map((post) => ({
    id: post.id,
    author: post.author,
    title: post.title,
    content: post.content,
    mediaUrl: post.mediaUrl,
    tags: post.tags.map((pt) => pt.tag.name),
    likes: post._count.likes,
    commentsCount: post._count.comments,
    isLiked: post.likes.length > 0,
    isSaved: post.favorites.length > 0,
    createdAt: post.createdAt,
    moderation: post.moderation,
  }));
};

export const createPostService = async (
  authorId: string,
  data: {
    title?: string;
    content: string;
    tags?: string[];
  },
) => {
  if (!data.content?.trim())
    throw new Error("El contenido no puede estar vacío");

  const post = await prisma.post.create({
    data: {
      authorId,
      title: data.title?.trim() || null,
      content: data.content.trim(),
      moderation: "APPROVED",
      tags: {
        create: data.tags?.map((tagId) => ({ tagId })) ?? [],
      },
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
      tags: {
        include: { tag: true },
      },
      _count: {
        select: { likes: true, comments: true },
      },
    },
  });

  return {
    id: post.id,
    author: post.author,
    title: post.title,
    content: post.content,
    mediaUrl: post.mediaUrl,
    tags: post.tags.map((pt) => pt.tag.name),
    likes: post._count.likes,
    commentsCount: post._count.comments,
    isLiked: false,
    isSaved: false,
    createdAt: post.createdAt,
    moderation: post.moderation,
  };
};

export const deletePostService = async (userId: string, postId: string) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) throw new Error("Publicación no encontrada");
  if (post.authorId !== userId)
    throw new Error("No tienes permiso para eliminar esta publicación");

  await prisma.post.delete({ where: { id: postId } });
};

export const likePostService = async (userId: string, postId: string) => {
  const existing = await prisma.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (existing) {
    await prisma.like.delete({
      where: { userId_postId: { userId, postId } },
    });
    return { isLiked: false };
  }

  await prisma.like.create({ data: { userId, postId } });
  return { isLiked: true };
};

export const savePostService = async (userId: string, postId: string) => {
  const existing = await prisma.favorite.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (existing) {
    await prisma.favorite.delete({
      where: { userId_postId: { userId, postId } },
    });
    return { isSaved: false };
  }

  await prisma.favorite.create({ data: { userId, postId } });
  return { isSaved: true };
};

export const reportPostService = async (
  userId: string,
  postId: string,
  reason?: string,
) => {
  const existing = await prisma.report.findUnique({
    where: { reporterId_postId: { reporterId: userId, postId } },
  });

  if (existing) throw new Error("Ya reportaste este post");

  await prisma.report.create({
    data: { reporterId: userId, postId },
  });

  const reportCount = await prisma.report.count({
    where: { postId, status: "PENDING" },
  });

  if (reportCount >= 3) {
    await prisma.post.update({
      where: { id: postId },
      data: { isHidden: true },
    });
  }
};

export const getTagsService = async () => {
  return prisma.tag.findMany({
    select: {
      id: true,
      name: true,
      category: {
        select: { name: true, color: true },
      },
    },
    orderBy: { name: "asc" },
  });
};

export const searchPostsService = async (userId: string, q: string) => {
  if (!q?.trim()) return [];

  const posts = await prisma.post.findMany({
    where: {
      isHidden: false,
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { content: { contains: q, mode: "insensitive" } },
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 20,
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
      tags: { include: { tag: true } },
      _count: { select: { likes: true, comments: true } },
      likes: { where: { userId }, select: { userId: true } },
      favorites: { where: { userId }, select: { userId: true } },
    },
  });

  return posts.map((post) => ({
    id: post.id,
    author: post.author,
    title: post.title,
    content: post.content,
    mediaUrl: post.mediaUrl,
    tags: post.tags.map((pt) => pt.tag.name),
    likes: post._count.likes,
    commentsCount: post._count.comments,
    isLiked: post.likes.length > 0,
    isSaved: post.favorites.length > 0,
    createdAt: post.createdAt,
    moderation: post.moderation,
  }));
};
