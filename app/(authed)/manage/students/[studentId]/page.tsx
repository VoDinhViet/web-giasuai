import { notFound, redirect } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getCurrentUser } from "@/features/auth/actions/get-current-user"
import { StudentDetailPage } from "@/features/students/components/pages/student-detail-page"
import { getStudentById } from "@/features/students/constants/student-data"
import { UserRole } from "@/features/users/types"

export default async function StudentDetailRoute({
  params,
}: PageProps<"/manage/students/[studentId]">) {
  const { studentId } = await params
  const currentUserResponse = await getCurrentUser()

  if (
    currentUserResponse.success &&
    currentUserResponse.data?.role === UserRole.LEARNER
  ) {
    redirect("/manage/student-dashboard")
  }

  const student = getStudentById(studentId)

  if (!student) {
    notFound()
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Chi tiết học viên"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Danh sách lớp học", href: "/manage/classes" },
          { label: student.fullName },
        ]}
      />
      <StudentDetailPage student={student} />
    </div>
  )
}
