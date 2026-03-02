import UserProfileView from "@/features/profile/components/UserProfileView";

interface Props {
  params: Promise<{ username: string }>;
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;
  return <UserProfileView username={username} />;
}
