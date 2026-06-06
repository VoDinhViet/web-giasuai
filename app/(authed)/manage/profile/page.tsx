import { redirect } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getCurrentUser } from "@/features/auth/actions/get-current-user"
import { ProfilePage } from "@/features/users/components/detail/profile-page"

export default async function ProfileRoute() {
  const currentUserResponse = await getCurrentUser()

  if (!currentUserResponse.success || !currentUserResponse.data) {
    redirect("/login")
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Hồ sơ cá nhân"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Hồ sơ cá nhân" },
        ]}
      />
      <ProfilePage user={currentUserResponse.data} />
    </div>
  )
}
