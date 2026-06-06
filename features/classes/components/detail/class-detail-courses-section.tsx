import { BookOpenCheck } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import type { Pagination } from "@/types/api"
import type { ClassCourse } from "../../types"
import { ClassCoursesTable } from "./class-courses-table"

type ClassDetailCoursesSectionProps = {
  courses: ClassCourse[]
  pagination?: Pagination
}

export function ClassDetailCoursesSection({
  courses,
  pagination,
}: ClassDetailCoursesSectionProps) {
  return (
    <Card className="border-border/80 py-0 shadow-xs">
      <CardContent className="px-0">
        <div className="border-b border-border/70 p-4">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
            <BookOpenCheck className="size-4" />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-foreground">
              Khóa học trong lớp
            </h2>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              Quản lý các khóa học và học liệu được thêm vào lớp.
            </p>
          </div>
        </div>
        </div>
        <ClassCoursesTable courses={courses} pagination={pagination} />
      </CardContent>
    </Card>
  )
}
