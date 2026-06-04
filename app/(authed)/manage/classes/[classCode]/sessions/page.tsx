import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getClass } from "@/features/classes/actions/get-class"
import { getClassSessions } from "@/features/classes/actions/get-class-sessions"
import { ClassSessionsPage } from "@/features/classes/components/pages/class-sessions-page"

export default async function ClassSessionsRoute({
  params,
}: PageProps<"/manage/classes/[classCode]/sessions">) {
  const { classCode } = await params
  const [classDetail, sessions] = await Promise.all([
    getClass(classCode).catch(() => null),
    getClassSessions(classCode).catch(() => null),
  ])

  if (!classDetail || !sessions) {
    notFound()
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Quản lý buổi học"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Danh sách lớp học", href: "/manage/classes" },
          {
            label: classDetail.code,
            href: `/manage/classes/${classDetail.code}`,
          },
          { label: "Buổi học" },
        ]}
      />
      <ClassSessionsPage classDetail={classDetail} sessions={sessions} />
    </div>
  )
}
