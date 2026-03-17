import PostDetailPage from "@/features/forums/components/PostDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ forumId: string; postId: string }>;
}) {
  const { forumId, postId } = await params;
  return <PostDetailPage postId={postId} forumId={forumId} />;
}
