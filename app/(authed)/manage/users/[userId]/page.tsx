import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { Button } from "@/components/ui/button"
import { getUser } from "@/features/users/actions/get-user"
import { ProfilePage } from "@/features/users/components/detail/profile-page"
import { UserLockButton } from "@/features/users/components/detail/user-lock-button"

export const dynamic = "force-dynamic"

export default async function UserDetailRoute({
  params,
}: PageProps<"/manage/users/[userId]">) {
  const { userId } = await params
  const user = await getUser(userId).catch(() => null)

  if (!user) {
    notFound()
  }

  return (
    <div className="grid gap-5">
      <PageTitleBar
        title="Chi tiết người dùng"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Quản lý người dùng", href: "/manage/users" },
          { label: user.fullName },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="outline" asChild>
              <Link href="/manage/users">
                <ArrowLeft className="size-4" />
                Quay lại
              </Link>
            </Button>
            <UserLockButton userId={user.id} isLocked={user.isLocked} />
          </div>
        }
      />
      <ProfilePage user={user} />
    </div>
  )
}
