import { notFound } from "next/navigation"

import { getUser } from "@/features/users/actions/get-user"
import { ProfilePage } from "@/features/users/components/detail/profile-page"

export const dynamic = "force-dynamic"

export default async function UserDetailRoute({
  params,
}: PageProps<"/manage/users/[userId]">) {
  const { userId } = await params
  const user = await getUser(userId).catch(() => null)

  if (!user) {
    notFound()
  }

  return <ProfilePage user={user} />
}
