import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getUser } from "@/features/users/actions/get-user"
import { EditUserDialog } from "@/features/users/components/dialogs/edit-user-dialog"
import { UserLockButton } from "@/features/users/components/actions/user-lock-button"
import { ProfilePage } from "@/features/profile/components/pages/profile-page"

export const dynamic = "force-dynamic"

export default async function UserDetailRoute({
  params,
}: PageProps<"/manage/users/[userId]">) {
  const { userId } = await params
  const user = await getUser(userId)

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <Button asChild variant="outline">
          <Link href="/manage/users">
            <ArrowLeft className="size-4" />
            Quay lại
          </Link>
        </Button>
        <EditUserDialog user={user} />
        <UserLockButton userId={user.id} isLocked={user.isLocked} />
      </div>
      <ProfilePage user={user} targetUserId={user.id} />
    </div>
  )
}
