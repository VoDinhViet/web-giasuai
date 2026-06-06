import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { CourseLessonEditorPage } from "@/features/courses/components/lesson-editor/lesson-editor-page"
import { getCourseByCode } from "@/features/courses/constants/course-data"

export default async function CourseLessonEditorRoute({
  params,
}: PageProps<"/manage/courses/[courseCode]/lessons/[lessonCode]">) {
  const { courseCode, lessonCode } = await params
  const course = getCourseByCode(courseCode)

  if (!course) {
    notFound()
  }

  const lesson = course.lessons.find(
    (courseLesson) => courseLesson.lessonCode === lessonCode
  )

  if (!lesson) {
    notFound()
  }

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <PageTitleBar
        title="Biên soạn bài học"
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage" },
          { label: "Quản lý khóa học", href: "/manage/courses" },
          {
            label: course.courseCode,
            href: `/manage/courses/${course.courseCode}/lessons`,
          },
          { label: lesson.lessonCode },
        ]}
      />
      <CourseLessonEditorPage course={course} lesson={lesson} />
    </div>
  )
}
