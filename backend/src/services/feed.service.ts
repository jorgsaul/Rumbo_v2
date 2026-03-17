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
        include: {
          tag: {
            include: {
              category: {
                select: { color: true },
              },
            },
          },
        },
      },
      _count: {
        select: { likes: true, comments: true },
      },
      likes: {
        where: { userId },
        select: { userId: true },
      },
      reports: {
        where: { reporterId: userId },
        select: { reporterId: true },
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

export const getPostByIdService = async (postId: string, userId: string) => {
  const post = await prisma.post.findUnique({
    where: { id: postId, isHidden: false },
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
          tag: {
            include: { category: { select: { color: true } } },
          },
        },
      },
      _count: { select: { likes: true, comments: true } },
      likes: { where: { userId }, select: { userId: true } },
      favorites: { where: { userId }, select: { userId: true } },
      reports: { where: { reporterId: userId }, select: { reporterId: true } },
    },
  });

  if (!post) throw new Error("Publicación no encontrada");

  return {
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
  };
};

export const createPostService = async (
  authorId: string,
  data: {
    title?: string;
    content: string;
    tags?: string[];
    mediaUrl?: string;
    mediaPublicId: string;
    forumId?: string;
  },
) => {
  if (!data.content?.trim())
    throw new Error("El contenido no puede estar vacío");

  const post = await prisma.post.create({
    data: {
      authorId,
      title: data.title?.trim() || null,
      content: data.content.trim(),
      mediaUrl: data.mediaUrl ?? null,
      moderation: "APPROVED",
      forumId: data.forumId ?? null,
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
        include: {
          tag: {
            include: {
              category: {
                select: { color: true },
              },
            },
          },
        },
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
    forumId: post.forumId,
    tags: post.tags.map((pt) => ({
      name: pt.tag.name,
      color: pt.tag.category?.color ?? "#6b7280",
    })),
    likes: post._count.likes,
    commentsCount: post._count.comments,
    isLiked: false,
    isSaved: false,
    isReported: false,
    createdAt: post.createdAt,
    moderation: post.moderation,
  };
};

export const deletePostService = async (userId: string, postId: string) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error("Publicación no encontrada");
  if (post.authorId !== userId) throw new Error("No tienes permiso");

  if (post.mediaPublicId) {
    const { deleteImageService } = await import("./upload.service");
    await deleteImageService(post.mediaPublicId);
  }

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

export const reportPostService = async (userId: string, postId: string) => {
  const existing = await prisma.report.findUnique({
    where: { reporterId_postId: { reporterId: userId, postId } },
  });
  if (existing) {
    const err = new Error("Ya reportaste este post");
    (err as any).status = 409;
    throw err;
  }

  await prisma.report.create({
    data: { reporterId: userId, postId },
  });

  const reportCount = await prisma.report.count({
    where: { postId, status: "PENDING" },
  });

  if (reportCount >= 3) {
    await prisma.post.update({
      where: { id: postId },
      data: {
        isHidden: true,
        moderation: "FLAGGED",
      },
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
      tags: {
        include: {
          tag: {
            include: {
              category: {
                select: { color: true },
              },
            },
          },
        },
      },
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
    forumId: post.forumId,
    tags: post.tags.map((pt) => ({
      name: pt.tag.name,
      color: pt.tag.category?.color ?? "#6b7280",
    })),
    likes: post._count.likes,
    commentsCount: post._count.comments,
    isLiked: post.likes.length > 0,
    isSaved: post.favorites.length > 0,
    createdAt: post.createdAt,
    moderation: post.moderation,
  }));
};

export const uploadPostImageService = async (buffer: Buffer) => {
  const { uploadImageService } = await import("./upload.service");
  return uploadImageService(buffer, "rumbo/posts");
};

//ADMIN

export const adminGetReportsService = async () => {
  return prisma.post.findMany({
    where: {
      isHidden: true,
      moderation: "FLAGGED",
    },
    orderBy: { updatedAt: "desc" },
    include: {
      author: {
        select: { id: true, username: true, avatarUrl: true },
      },
      reports: {
        where: { status: "PENDING" },
        include: {
          reporter: {
            select: { id: true, username: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { reports: true } },
    },
  });
};

export const adminModeratePostService = async (
  postId: string,
  action: "APPROVE" | "REJECT",
) => {
  if (action === "APPROVE") {
    // Restaurar post y limpiar reportes
    await prisma.post.update({
      where: { id: postId },
      data: {
        isHidden: false,
        moderation: "APPROVED",
      },
    });
    await prisma.report.updateMany({
      where: { postId },
      data: { status: "RESOLVED" },
    });
  } else {
    // Borrar el post (cascade borra reportes, likes, etc)
    await prisma.post.delete({ where: { id: postId } });
  }

  return { ok: true };
};

export const adminGetModerationStatsService = async () => {
  const [pending, approved, rejected, flagged, hidden] = await Promise.all([
    prisma.report.count({ where: { status: "PENDING" } }),
    prisma.post.count({ where: { moderation: "APPROVED" } }),
    prisma.post.count({ where: { moderation: "REJECTED" } }),
    prisma.post.count({ where: { moderation: "FLAGGED" } }),
    prisma.post.count({ where: { isHidden: true } }),
  ]);
  return { pending, approved, rejected, flagged, hidden };
};
