import prisma from "../lib/prisma";
import { getPostsService } from "./feed.service";

export const getMeService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      fullName: true,
      email: true,
      role: true,
      educationLevel: true,
      bio: true,
      avatarUrl: true,
      bannerUrl: true,
      isPrivate: true,
      createdAt: true,
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!user) throw new Error("Usuario no encontrado");
  return user;
};

export const updateProfileService = async (
  userId: string,
  data: {
    fullName?: string;
    bio?: string;
    isPrivate?: boolean;
  },
) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      username: true,
      fullName: true,
      bio: true,
      avatarUrl: true,
      bannerUrl: true,
      isPrivate: true,
    },
  });

  return user;
};

const checkPrivacy = async (requesterId: string, targetUserId: string) => {
  if (requesterId === targetUserId) return;
  const user = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { isPrivate: true },
  });
  if (user?.isPrivate) throw new Error("Perfil privado");
};

const getPostInclude = (requesterId: string) => ({
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
  likes: { where: { userId: requesterId }, select: { userId: true } },
  favorites: { where: { userId: requesterId }, select: { userId: true } },
});

const formatPost = (requesterId: string) => (post: any) => ({
  id: post.id,
  author: post.author,
  title: post.title,
  content: post.content,
  mediaUrl: post.mediaUrl,
  tags: post.tags.map((pt: any) => pt.tag.name),
  likes: post._count.likes,
  commentsCount: post._count.comments,
  isLiked: post.likes?.some((l: any) => l.userId === requesterId) ?? false,
  isSaved: post.favorites?.some((f: any) => f.userId === requesterId) ?? false,
  createdAt: post.createdAt,
  moderation: post.moderation,
});

export const getUserPostsService = async (
  requesterId: string,
  targetUserId: string,
) => {
  await checkPrivacy(requesterId, targetUserId);
  return getPostsService(requesterId, undefined, targetUserId);
};

export const getUserLikesService = async (
  requesterId: string,
  targetUserId: string,
) => {
  await checkPrivacy(requesterId, targetUserId);
  const likes = await prisma.like.findMany({
    where: { userId: targetUserId },
    orderBy: { createdAt: "desc" },
    include: { post: { include: getPostInclude(requesterId) } },
  });
  return likes.map((l) => formatPost(requesterId)(l.post));
};

export const getUserSavedService = async (
  requesterId: string,
  targetUserId: string,
) => {
  await checkPrivacy(requesterId, targetUserId);
  const saved = await prisma.favorite.findMany({
    where: { userId: targetUserId },
    orderBy: { createdAt: "desc" },
    include: { post: { include: getPostInclude(requesterId) } },
  });
  return saved.map((s) => formatPost(requesterId)(s.post));
};

export const getUserCommentsService = async (
  requesterId: string,
  targetUserId: string,
) => {
  await checkPrivacy(requesterId, targetUserId);
  return prisma.comment.findMany({
    where: { authorId: targetUserId, isHidden: false },
    orderBy: { createdAt: "desc" },
    include: {
      post: {
        select: { id: true, title: true, content: true },
      },
    },
  });
};

export const getUserByUsernameService = async (
  username: string,
  requesterId: string,
) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      fullName: true,
      role: true,
      educationLevel: true,
      bio: true,
      avatarUrl: true,
      bannerUrl: true,
      isPrivate: true,
      createdAt: true,
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
      followers: {
        where: { followerId: requesterId },
        select: { followerId: true },
      },
    },
  });

  if (!user) throw new Error("Usuario no encontrado");

  const { followers, ...rest } = user;
  return { ...rest, isFollowing: followers.length > 0 };
};

export const followUserService = async (
  followerId: string,
  followingId: string,
) => {
  if (followerId === followingId)
    throw new Error("No puedes seguirte a ti mismo");

  const existing = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId, followingId } },
  });

  if (existing) {
    await prisma.follow.delete({
      where: { followerId_followingId: { followerId, followingId } },
    });
    return { isFollowing: false };
  }

  await prisma.follow.create({
    data: { followerId, followingId },
  });

  return { isFollowing: true };
};

export const searchUsersService = async (q: string) => {
  if (!q?.trim()) return [];

  return prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: q, mode: "insensitive" } },
        { fullName: { contains: q, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      username: true,
      fullName: true,
      avatarUrl: true,
      role: true,
      educationLevel: true,
    },
    take: 8,
  });
};
