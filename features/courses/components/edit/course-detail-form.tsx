"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateCourse } from "@/features/courses/actions/update-course"
import {
  updateCourseSchema,
  type UpdateCourseInput,
} from "@/features/courses/schemas/course-form.schema"
import type { Course } from "@/features/courses/types"

type CourseDetailFormProps = {
  course: Course
  formId: string
}

export function CourseDetailForm({ course, formId }: CourseDetailFormProps) {
  const defaultValues: UpdateCourseInput = {
    code: course.code,
    name: course.name,
    category: course.category,
    description: course.description ?? "",
    audience: course.audience ?? "",
    level: course.level,
    durationMinutes: course.durationMinutes,
    startDate: course.startDate ?? "",
    status: course.status,
  }

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: updateCourseSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateCourse(course.id, value)
        toast.success("Đã lưu thông tin khóa học.")
      } catch {
        toast.error("Không thể lưu thông tin khóa học.")
      }
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin cơ bản</CardTitle>
        <CardDescription>
          Phần này chỉ quản lý dữ liệu tổng quan của một khóa học.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id={formId}
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            form.handleSubmit()
          }}
          noValidate
        >
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <form.Field name="code">
              {(field) => (
                <TextField
                  id="courseCode"
                  label="Mã khóa học"
                  value={field.state.value}
                  errors={field.state.meta.errors}
                  touched={field.state.meta.isTouched}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>

            <form.Field name="name">
              {(field) => (
                <TextField
                  id="courseName"
                  label="Tên khóa học"
                  value={field.state.value}
                  errors={field.state.meta.errors}
                  touched={field.state.meta.isTouched}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>

            <form.Field name="category">
              {(field) => (
                <TextField
                  id="category"
                  label="Danh mục"
                  value={field.state.value}
                  errors={field.state.meta.errors}
                  touched={field.state.meta.isTouched}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>

            <form.Field name="level">
              {(field) => (
                <TextField
                  id="level"
                  label="Cấp độ"
                  value={field.state.value}
                  errors={field.state.meta.errors}
                  touched={field.state.meta.isTouched}
                  onBlur={field.handleBlur}
                  onChange={(value) =>
                    field.handleChange(value as UpdateCourseInput["level"])
                  }
                />
              )}
            </form.Field>

            <form.Field name="durationMinutes">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="durationMinutes">
                      Thời lượng
                    </FieldLabel>
                    <Input
                      id="durationMinutes"
                      type="number"
                      min={0}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(Number(event.target.value))
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="startDate">
              {(field) => (
                <TextField
                  id="startDate"
                  label="Ngày khai giảng"
                  value={field.state.value ?? ""}
                  errors={field.state.meta.errors}
                  touched={field.state.meta.isTouched}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <TextareaField
                  id="description"
                  label="Mô tả"
                  value={field.state.value ?? ""}
                  errors={field.state.meta.errors}
                  touched={field.state.meta.isTouched}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>

            <form.Field name="audience">
              {(field) => (
                <TextareaField
                  id="audience"
                  label="Đối tượng học viên"
                  value={field.state.value ?? ""}
                  rows={3}
                  errors={field.state.meta.errors}
                  touched={field.state.meta.isTouched}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

type FieldErrors = Array<{ message?: string } | undefined>

type TextFieldProps = {
  id: string
  label: string
  value: string
  touched: boolean
  errors: FieldErrors
  onBlur: () => void
  onChange: (value: string) => void
}

function TextField({
  id,
  label,
  value,
  touched,
  errors,
  onBlur,
  onChange,
}: TextFieldProps) {
  const isInvalid = touched && errors.length > 0

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        value={value}
        aria-invalid={isInvalid}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
      />
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  )
}

type TextareaFieldProps = TextFieldProps & {
  rows?: number
}

function TextareaField({
  id,
  label,
  value,
  touched,
  errors,
  rows = 4,
  onBlur,
  onChange,
}: TextareaFieldProps) {
  const isInvalid = touched && errors.length > 0

  return (
    <Field className="sm:col-span-2" data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Textarea
        id={id}
        rows={rows}
        value={value}
        aria-invalid={isInvalid}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
      />
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  )
}
