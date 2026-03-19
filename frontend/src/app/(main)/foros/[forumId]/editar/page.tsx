import ForumEditPage from "@/features/forums/components/ForumEditPage";

export default async function Page({
  params,
}: {
  params: Promise<{ forumId: string }>;
}) {
  const { forumId } = await params;
  return <ForumEditPage forumId={forumId} />;
}
