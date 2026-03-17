import PostDetailPage from "@/features/forums/components/PostDetailPage";

export default function Page({
  params,
}: {
  params: { forumId: string; postId: string };
}) {
  return <PostDetailPage postId={params.postId} forumId={params.forumId} />;
}
