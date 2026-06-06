import type { Pagination } from "@/types/api"
import type { CourseStats } from "../actions/get-course-stats"
import type { CourseListItem } from "../types"
import { CourseStatsSection } from "./shared/stats-section"
import { CoursesTable } from "./shared/courses-table"

type CoursesPageProps = {
  stats: CourseStats
  courses: CourseListItem[]
  pagination: Pagination
}

export function CoursesPage({ stats, courses, pagination }: CoursesPageProps) {
  return (
    <div className="flex w-full flex-col gap-5">
      <CourseStatsSection stats={stats} />

      <CoursesTable courses={courses} pagination={pagination} />
    </div>
  )
}
