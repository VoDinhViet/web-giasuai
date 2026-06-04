import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getClass } from "@/features/classes/actions/get-class"
import { getClassAttendance } from "@/features/classes/actions/get-class-attendance"
import { ClassAttendancePage } from "@/features/classes/components/pages/class-attendance-page"

export default async function ClassAttendanceRoute({
  params,
}: PageProps<"/manage/classes/[classCode]/sessions/[sessionCode]/attendance">) {
  const { classCode, sessionCode } = await params
  const [classDetail, attendance] = await Promise.all([
    getClass(classCode).catch(() => null),
    getClassAttendance(classCode, sessionCode).catch(() => null),
  ])

  if (!classDetail || !attendance) {
    notFound()
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Điểm danh buổi học"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Danh sách lớp học", href: "/manage/classes" },
          {
            label: classDetail.code,
            href: `/manage/classes/${classDetail.code}`,
          },
          {
            label: "Buổi học",
            href: `/manage/classes/${classDetail.code}/sessions`,
          },
          { label: attendance.session.code },
        ]}
      />
      <ClassAttendancePage classDetail={classDetail} attendance={attendance} />
    </div>
  )
}
