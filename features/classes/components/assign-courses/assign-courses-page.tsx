"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { useAppForm } from "@/components/form/app-form"
import {
  Field,
  FieldError,
} from "@/components/ui/field"
import type { Pagination } from "@/types/api"
import { assignClassCourse } from "../../actions/assign-class-course"
import {
  assignClassCourseSchema,
  type AssignClassCourseInput,
} from "../../schemas/class.schema"
import type {
  Class,
  UnassignedClassCourse,
} from "../../types"
import { UnassignedCoursePicker } from "./unassigned-course-picker"
import { AssignActionsCard } from "./assign-actions-card"

type AssignCoursesPageProps = {
  class: Class
  unassignedCourses: UnassignedClassCourse[]
  unassignedCoursesPagination: Pagination
}

const assignCoursesDefaultValues: AssignClassCourseInput = {
  courseId: "",
  required: true,
}

export function AssignCoursesPage(props: AssignCoursesPageProps) {
  const router = useRouter()

  const form = useAppForm({
    defaultValues: assignCoursesDefaultValues,
    validators: {
      onSubmit: assignClassCourseSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await assignClassCourse({
        classCode: props.class.code,
        input: value,
      })

      if (!res.success) return toast.error(res.message)

      toast.success(res.message)
      router.push(`/manage/classes/${props.class.code}`)
      router.refresh()
    },
  })

  return (
    <form
      className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
      noValidate
    >
      <div className="grid min-w-0 gap-5">
        <form.AppField name="courseId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <UnassignedCoursePicker
                  courses={props.unassignedCourses}
                  pagination={props.unassignedCoursesPagination}
                  selectedCourseId={field.state.value}
                  onSelect={field.handleChange}
                />
                {isInvalid ? (
                  <FieldError errors={field.state.meta.errors} />
                ) : null}
              </Field>
            )
          }}
        </form.AppField>
      </div>

      <aside className="grid gap-5 xl:sticky xl:top-5 xl:self-start">
        <AssignActionsCard
          form={form}
          classCode={props.class.code}
          unassignedCourses={props.unassignedCourses}
        />
      </aside>
    </form>
  )
}
