import type { User } from "@/features/users/types"
import type { PaginatedResponse } from "@/types/api"
import type { ClassCourse, ClassDetail } from "../../types"
import { ClassDetailCourses } from "./class-detail-courses"
import { ClassDetailLearnersSection } from "./class-detail-learners-section"
import { ClassDetailSidebar } from "./class-detail-sidebar"
import { ClassDetailStats } from "./class-detail-stats"
import { ClassDetailTitle } from "./class-detail-title"

type ClassDetailPageProps = {
  classDetail: ClassDetail
  classLearners: PaginatedResponse<User> | null
  classCourses: PaginatedResponse<ClassCourse> | null
}

export function ClassDetailPage({
  classDetail,
  classLearners,
  classCourses,
}: ClassDetailPageProps) {
  const learners = classLearners?.data ?? []
  const courses = classCourses?.data ?? []
  const sessions = classDetail.sessions ?? []

  return (
    <div className="flex w-full flex-col gap-5">
      <ClassDetailTitle classDetail={classDetail} canManageClass />

      <ClassDetailStats classDetail={classDetail} />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-5">
          <ClassDetailLearnersSection
            learners={learners}
            pagination={classLearners?.pagination}
          />
          <ClassDetailCourses
            courses={courses}
            pagination={classCourses?.pagination}
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
