import type { Pagination } from "@/types/api"
import type { CourseStats } from "../../actions/get-course-stats"
import type { CourseListItem } from "../../types"
import { CourseStatsSection } from "../sections/course-stats-section"
import { CoursesTable } from "../tables/courses-table"

type CoursesPageProps = {
  stats: CourseStats
  courses: CourseListItem[]
  pagination: Pagination
}

export function CoursesPage({ stats, courses, pagination }: CoursesPageProps) {
  return (
    <div className="flex w-full flex-col gap-5">
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
        Theo dõi danh mục khóa học, người biên soạn, lịch khai giảng và số lượng học
        viên đăng ký. Có thể tạo khóa học từ file Excel và biên soạn nội dung sau khi nhập.
      </p>

      <CourseStatsSection stats={stats} />

      <CoursesTable courses={courses} pagination={pagination} />
    </div>
  )
}
