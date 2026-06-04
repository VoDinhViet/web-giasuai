import type { ClassDetail } from "../../types"
import { ClassDetailCoursesSection } from "./class-detail-courses-section"
import { ClassDetailSidebar } from "./class-detail-sidebar"
import { ClassDetailStats } from "./class-detail-stats"
import { ClassDetailStudentsSection } from "./class-detail-students-section"
import { ClassDetailTitle } from "./class-detail-title"

type ClassDetailPageProps = {
  classDetail: ClassDetail
}

export function ClassDetailPage({ classDetail }: ClassDetailPageProps) {
  return (
    <div className="flex w-full flex-col gap-5">
      <ClassDetailTitle classDetail={classDetail} />

      <ClassDetailStats classDetail={classDetail} />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-5">
          <ClassDetailStudentsSection students={classDetail.students} />
          <ClassDetailCoursesSection courses={classDetail.courses} />
        </div>

        <ClassDetailSidebar classDetail={classDetail} />
      </section>
    </div>
  )
}
