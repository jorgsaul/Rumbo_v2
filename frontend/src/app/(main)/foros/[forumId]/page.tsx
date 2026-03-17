import ForumDetailPage from "@/features/forums/components/ForumDetailPage";

export default function Page({ params }: { params: { forumId: string } }) {
  return <ForumDetailPage forumId={params.forumId} />;
}
