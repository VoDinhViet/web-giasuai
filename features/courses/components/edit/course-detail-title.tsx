import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Course } from "@/features/courses/types"

type CourseDetailTitleProps = {
  course: Course
  formId: string
}

export function CourseDetailTitle({ course, formId }: CourseDetailTitleProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                {course.code}
              </span>
              <span className="rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80">
                {course.category}
              </span>
            </div>
            <CardTitle className="text-xl leading-7">
              Biên soạn khóa học
            </CardTitle>
            <CardDescription className="mt-2 max-w-3xl">
              Chỉnh thông tin cơ bản của khóa học. Nội dung chi tiết nằm trong
              từng bài học.
            </CardDescription>
          </div>

          <Button type="submit" form={formId}>
            <Save className="size-4" />
            Lưu thông tin
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
