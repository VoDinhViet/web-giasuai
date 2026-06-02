import { notFound } from "next/navigation";

import { requirePermission } from "@/lib/guards";
import { getUser } from "@/features/users/actions/get-user";
import { UserDetailPage } from "@/features/users/components/UserDetailPage";

interface UserDetailManagePageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserDetailManagePage({
  params,
}: UserDetailManagePageProps) {
  await requirePermission("users.read");

  const { userId } = await params;
  const user = await getUser(userId);

  if (!user) {
    notFound();
  }

  return <UserDetailPage user={user} />;
}
