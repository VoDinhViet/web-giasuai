import { notFound } from "next/navigation"

import { PageTitleBar } from "@/components/page-title-bar"
import { getCourse } from "@/features/courses/actions/get-course"
import { getLesson } from "@/features/lessons/actions/get-lesson"
import { LessonEditorPage } from "@/features/lessons/components/lesson-editor/lesson-editor-page"

export default async function LessonEditRoute({
  params,
}: PageProps<"/manage/lessons/[lessonId]/edit">) {
  const { lessonId } = await params
  const lesson = await getLesson(lessonId).catch(() => null)

  if (!lesson) {
    notFound()
  }

  const course = await getCourse(lesson.courseId).catch(() => null)

  if (!course) {
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
            label: course.code,
            href: `/manage/courses/${course.id}`,
          },
          { label: lesson.title },
        ]}
      />
      <LessonEditorPage
        course={course}
        courseId={course.id}
        lesson={lesson}
      />
    </div>
  )
}
