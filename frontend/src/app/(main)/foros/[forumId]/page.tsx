import ForumDetailPage from "@/features/forums/components/ForumDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ forumId: string }>;
}) {
  const { forumId } = await params;
  return <ForumDetailPage forumId={forumId} />;
}
