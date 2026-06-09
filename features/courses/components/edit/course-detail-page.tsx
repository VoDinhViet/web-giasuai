"use client"

import type { Course } from "@/features/courses/types"
import { CourseDetailForm } from "./course-detail-form"
import { CourseDetailLessonsCard } from "./course-detail-lessons-card"
import { CourseDetailTitle } from "./course-detail-title"
import { LessonStructureCard } from "./lesson-structure-card"

type CourseDetailPageProps = {
  course: Course
}

export function CourseDetailPage({ course }: CourseDetailPageProps) {
  const formId = "course-detail-form"

  return (
    <div className="grid gap-5">
      <CourseDetailTitle course={course} formId={formId} />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-5">
          <CourseDetailForm course={course} formId={formId} />

          <CourseDetailLessonsCard
            courseCode={course.code}
            lessons={course.lessons ?? []}
          />
        </div>

        <aside className="grid content-start gap-5">
          <LessonStructureCard />
        </aside>
      </section>
    </div>
  )
}
