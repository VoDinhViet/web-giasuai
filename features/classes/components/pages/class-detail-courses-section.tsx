import { BookOpenCheck } from "lucide-react"

import { ClassCoursesTable } from "../tables/class-courses-table"
import type { ClassCourse } from "../../types"
import { ClassDetailSectionHeader } from "./class-detail-section-header"

type ClassDetailCoursesSectionProps = {
  courses: ClassCourse[]
}

export function ClassDetailCoursesSection({
  courses,
}: ClassDetailCoursesSectionProps) {
  return (
    <section className="rounded border border-border/80 bg-card shadow-xs">
      <div className="border-b border-border/70 p-4">
        <ClassDetailSectionHeader
          icon={BookOpenCheck}
          title="Khóa học trong lớp"
          description="Quản lý các khóa học và học liệu được thêm vào lớp."
        />
      </div>

      <ClassCoursesTable courses={courses} />
    </section>
  )
}
