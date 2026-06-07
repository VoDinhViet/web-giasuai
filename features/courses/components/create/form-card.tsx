import { BookOpenCheck, Save } from "lucide-react"

import { withForm } from "@/components/form/app-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { CreateCourseInput } from "@/features/courses/schemas/course-form.schema"
import type { CourseLevel, CourseStatus } from "@/features/courses/types"

const courseFormDefaultValues: CreateCourseInput = {
  code: "",
  name: "",
  category: "",
  description: "",
  audience: "",
  level: "ALL_LEVELS",
  durationMinutes: 0,
  startDate: "",
  status: "DRAFT",
}

type CreateCourseFormCardProps = {
  submitError: string | null
}

const createCourseFormDefaultProps: CreateCourseFormCardProps = {
  submitError: null,
}

const courseLevelOptions = [
  { value: "ALL_LEVELS", label: "Mọi trình độ" },
  { value: "BEGINNER", label: "Cơ bản" },
  { value: "INTERMEDIATE", label: "Trung cấp" },
  { value: "ADVANCED", label: "Nâng cao" },
] satisfies Array<{ value: CourseLevel; label: string }>

const courseStatusOptions = [
  { value: "DRAFT", label: "Bản nháp" },
  { value: "PUBLISHED", label: "Xuất bản" },
  { value: "ARCHIVED", label: "Lưu trữ" },
] satisfies Array<{ value: CourseStatus; label: string }>

export const CreateCourseFormCard = withForm({
  defaultValues: courseFormDefaultValues,
  props: createCourseFormDefaultProps,
  render: function RenderCreateCourseFormCard({ form, submitError }) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpenCheck className="size-4" />
            <CardTitle>Thông tin khóa học</CardTitle>
          </div>
          <CardDescription>
            Nhập thông tin cốt lõi trước, chương và bài học có thể bổ sung sau.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <form.AppField name="code">
              {(field) => (
                <field.TextField label="Mã khóa học" placeholder="COURSE-001" />
              )}
            </form.AppField>

            <form.AppField name="category">
              {(field) => (
                <field.TextField label="Danh mục" placeholder="Toán học" />
              )}
            </form.AppField>

            <div className="sm:col-span-2">
              <form.AppField name="name">
                {(field) => (
                  <field.TextField
                    label="Tên khóa học"
                    placeholder="Nền tảng Toán tư duy"
                  />
                )}
              </form.AppField>
            </div>

            <form.Field name="level">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Trình độ</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(value as CourseLevel)
                      }
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={isInvalid}
                      >
                        <SelectValue placeholder="Chọn trình độ" />
                      </SelectTrigger>
                      <SelectContent>
                        {courseLevelOptions.map((levelOption) => (
                          <SelectItem
                            key={levelOption.value}
                            value={levelOption.value}
                          >
                            {levelOption.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="status">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Trạng thái</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(value as CourseStatus)
                      }
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={isInvalid}
                      >
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        {courseStatusOptions.map((statusOption) => (
                          <SelectItem
                            key={statusOption.value}
                            value={statusOption.value}
                          >
                            {statusOption.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="durationMinutes">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Thời lượng dự kiến
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={0}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(Number(event.target.value))
                      }
                      aria-invalid={isInvalid}
                    />
                    <FieldDescription>Đơn vị phút.</FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.AppField name="startDate">
              {(field) => (
                <field.TextField
                  label="Ngày bắt đầu"
                  placeholder="YYYY-MM-DD"
                  type="text"
                />
              )}
            </form.AppField>

            <div className="sm:col-span-2">
              <form.AppField name="description">
                {(field) => (
                  <field.TextareaField
                    label="Mô tả"
                    placeholder="Tóm tắt mục tiêu và nội dung chính của khóa học"
                    rows={4}
                  />
                )}
              </form.AppField>
            </div>

            <div className="sm:col-span-2">
              <form.AppField name="audience">
                {(field) => (
                  <field.TextareaField
                    label="Đối tượng học"
                    placeholder="Mô tả nhóm học viên phù hợp với khóa học"
                    rows={3}
                  />
                )}
              </form.AppField>
            </div>
          </FieldGroup>

          {submitError ? (
            <FieldError className="mt-4">{submitError}</FieldError>
          ) : null}
        </CardContent>

        <CardFooter className="justify-end border-t">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                <Save data-icon="inline-start" />
                {isSubmitting ? "Đang tạo..." : "Tạo khóa học"}
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </Card>
    )
  },
})

export { courseFormDefaultValues }
