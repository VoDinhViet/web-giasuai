import type { ClassDetail } from "../../types"
import { ClassDetailCourses } from "./class-detail-courses"
import { ClassDetailLearners } from "./class-detail-learners"
import { ClassDetailSidebar } from "./class-detail-sidebar"
import { ClassDetailStats } from "./class-detail-stats"
import { ClassDetailTitle } from "./class-detail-title"

type ClassDetailPageProps = {
  classDetail: ClassDetail
}

export function ClassDetailPage({
  classDetail,
}: ClassDetailPageProps) {
  const sessions = classDetail.sessions ?? []

  return (
    <div className="flex w-full flex-col gap-5">
      <ClassDetailTitle classDetail={classDetail} canManageClass />

      <ClassDetailStats classDetail={classDetail} />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-5">
          <ClassDetailLearners
            classCode={classDetail.code}
          />
          <ClassDetailCourses
            classCode={classDetail.code}
          />
        </div>

        <ClassDetailSidebar
          classDetail={{ ...classDetail, sessions }}
          canViewStudentInsights
        />
      </section>
    </div>
  )
}
