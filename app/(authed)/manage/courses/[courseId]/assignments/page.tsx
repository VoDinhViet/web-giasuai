import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getCourse } from "@/features/courses/actions/get-course"
import { CourseAssignmentsPage } from "@/features/courses/components/assignments/assignments-page"

export default async function CourseAssignmentsRoute({
  params,
}: PageProps<"/manage/courses/[courseId]/assignments">) {
  const { courseId } = await params
  const course = await getCourse(courseId).catch(() => null)

  if (!course) {
    notFound()
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Bài tập & chấm điểm"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Quản lý khóa học", href: "/manage/courses" },
          { label: course.code },
          { label: "Bài tập" },
        ]}
      />
      <CourseAssignmentsPage course={course} />
    </div>
  )
}
