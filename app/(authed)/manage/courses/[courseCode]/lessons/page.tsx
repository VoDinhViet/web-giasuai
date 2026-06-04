import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { CourseLessonsPage } from "@/features/courses/components/pages/course-lessons-page"
import { getCourseByCode } from "@/features/courses/constants/course-data"

export default async function CourseLessonsRoute({
  params,
}: PageProps<"/manage/courses/[courseCode]/lessons">) {
  const { courseCode } = await params
  const course = getCourseByCode(courseCode)

  if (!course) {
    notFound()
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Biên soạn khóa học"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Quản lý khóa học", href: "/manage/courses" },
          { label: course.courseCode },
          { label: "Biên soạn" },
        ]}
      />
      <CourseLessonsPage course={course} />
    </div>
  )
}
