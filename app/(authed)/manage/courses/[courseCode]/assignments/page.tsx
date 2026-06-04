import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { CourseAssignmentsPage } from "@/features/courses/components/pages/course-assignments-page"
import { getCourseByCode } from "@/features/courses/constants/course-data"

export default async function CourseAssignmentsRoute({
  params,
}: PageProps<"/manage/courses/[courseCode]/assignments">) {
  const { courseCode } = await params
  const course = getCourseByCode(courseCode)

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
          { label: course.courseCode },
          { label: "Bài tập" },
        ]}
      />
      <CourseAssignmentsPage course={course} />
    </div>
  )
}
