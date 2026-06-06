"use client"

import type { Route } from "next"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { useAppForm } from "@/components/form/app-form"
import { createCourse } from "@/features/courses/actions/create-course"
import { createCourseSchema } from "@/features/courses/schemas/course-form.schema"
import { CreateCourseFormCard, courseFormDefaultValues } from "./form-card"

const courseCreateToneClassName = "[&_[data-tone=info]_svg]:text-secondary"

export function CourseCreatePage() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const form = useAppForm({
    defaultValues: courseFormDefaultValues,
    validators: {
      onSubmit: createCourseSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      try {
        const createdCourse = await createCourse(value)

        form.reset(courseFormDefaultValues)
        router.push(`/manage/courses?q=${createdCourse.code}` as Route)
      } catch (createCourseError) {
        setSubmitError(
          createCourseError instanceof Error
            ? createCourseError.message
            : "Không thể tạo khóa học."
        )
      }
    },
  })

  return (
    <form
      className={`grid gap-5 ${courseCreateToneClassName}`}
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
      noValidate
    >
      <CreateCourseFormCard form={form} submitError={submitError} />
    </form>
  )
}
