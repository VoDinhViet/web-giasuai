import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getCourse } from "@/features/courses/actions/get-course"
import { CourseDetailPage } from "@/features/courses/components/edit/course-detail-page"

export default async function CourseDetailRoute({
  params,
}: PageProps<"/manage/courses/[courseId]">) {
  const { courseId } = await params
  const course = await getCourse(courseId).catch(() => null)

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
          { label: course.code },
          { label: "Biên soạn" },
        ]}
      />
      <CourseDetailPage course={course} />
    </div>
  )
}
