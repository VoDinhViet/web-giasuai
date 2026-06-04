import { redirect } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getCurrentUser } from "@/features/auth/actions/get-current-user"
import { StudentDashboardPage } from "@/features/student-dashboard/components/pages/student-dashboard-page"

export default async function StudentDashboardRoute() {
  const currentUserResponse = await getCurrentUser()

  if (!currentUserResponse.success || !currentUserResponse.data) {
    redirect("/login")
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Dashboard học viên"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Dashboard học viên" },
        ]}
      />
      <StudentDashboardPage user={currentUserResponse.data} />
    </div>
  )
}
