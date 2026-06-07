import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getClass } from "@/features/classes/actions/get-class"
import { getClassEnrollments } from "@/features/classes/actions/get-class-enrollments"
import { ClassEnrollmentsPage } from "@/features/classes/components/enrollments/class-enrollments-page"

export default async function ClassEnrollmentsRoute({
  params,
}: PageProps<"/manage/classes/[classCode]/enrollments">) {
  const { classCode } = await params
  const [classDetail, enrollments] = await Promise.all([
    getClass(classCode).catch(() => null),
    getClassEnrollments(classCode).catch(() => null),
  ])

  if (!classDetail || !enrollments) {
    notFound()
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Phê duyệt học viên"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Danh sách lớp học", href: "/manage/classes" },
          {
            label: classDetail.code,
            href: `/manage/classes/${classDetail.code}`,
          },
          { label: "Phê duyệt học viên" },
        ]}
      />
      <ClassEnrollmentsPage
        class={classDetail}
        enrollments={enrollments}
      />
    </div>
  )
}
