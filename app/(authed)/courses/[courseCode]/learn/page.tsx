import { notFound } from "next/navigation"

import { getCourseByCode } from "@/features/courses/constants/course-data"
import { StudentCourseLearningPage } from "@/features/student-learning/components/pages/student-course-learning-page"

export default async function StudentCourseLearningRoute({
  params,
}: PageProps<"/courses/[courseCode]/learn">) {
  const { courseCode } = await params
  const course = getCourseByCode(courseCode)

  if (!course) {
    notFound()
  }

  return (
    <main className="min-h-svh bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] min-w-0 flex-col gap-5">
        <header className="flex min-h-16 flex-col justify-center border-b border-border/70 pb-5">
          <p className="text-xs font-semibold text-muted-foreground">{course.courseCode}</p>
          <h1 className="mt-1 text-xl font-bold text-foreground">Vào học</h1>
        </header>
        <StudentCourseLearningPage course={course} />
      </div>
    </main>
  )
}
