"use client"

import { useState, type ReactNode } from "react"
import { useForm } from "@tanstack/react-form"
import { useRouter } from "next/navigation"
import {
  Bell,
  BookOpenCheck,
  CalendarDays,
  Check,
  Clock3,
  GraduationCap,
  Monitor,
  UserCheck,
  Users,
} from "lucide-react"
import { DateTime } from "luxon"

import { DatePicker } from "@/components/shared/date-picker"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { TimePicker } from "@/components/ui/time-picker"
import { cn } from "@/lib/utils"
import { updateClass } from "../../actions/update-class"
import {
  classJoinPolicyOptions,
  classFormatOptions,
  classStatusOptions,
  classWeekdayOptions,
  updateClassSchema,
  type UpdateClassInput,
} from "../../schemas/class.schema"
import type {
  ClassJoinPolicy,
  ClassDetail,
  ClassFormOption,
  ClassFormat,
  ClassWeekday,
} from "../../types"

type EditClassFormProps = {
  classDetail: ClassDetail
  courseOptions: ClassFormOption[]
  instructorOptions: ClassFormOption[]
}

const noneOptionValue = "none"

export function EditClassForm({
  classDetail,
  courseOptions,
  instructorOptions,
}: EditClassFormProps) {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: getClassFormValues(classDetail),
    validators: {
      onSubmit: updateClassSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      const saveClassResult = await updateClass(classDetail.code, value)

      if (!saveClassResult.success || !saveClassResult.data) {
        setSubmitError(saveClassResult.message ?? "Không thể cập nhật lớp học.")
        return
      }

      router.push(`/manage/classes/${saveClassResult.data.code}`)
    },
  })

  return (
    <form
      className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
      noValidate
    >
      <div className="flex min-w-0 flex-col gap-5">
        <FormSection
          icon={GraduationCap}
          title="Thông tin cơ bản"
          description="Đặt tên, mã lớp và trạng thái vận hành ban đầu."
        >
          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            <form.Field name="code">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <RequiredFieldLabel htmlFor={field.name}>
                      Mã lớp
                    </RequiredFieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value.toUpperCase())
                      }
                      placeholder="CLS-001"
                      aria-invalid={isInvalid}
                    />
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
                    <RequiredFieldLabel>Trạng thái</RequiredFieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(value as UpdateClassInput["status"])
                      }
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={isInvalid}
                      >
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        {classStatusOptions.map((statusOption) => (
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

            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid} className="sm:col-span-2">
                    <RequiredFieldLabel htmlFor={field.name}>
                      Tên lớp học
                    </RequiredFieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="B2B Sales A01"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
        </FormSection>

        <FormSection
          icon={BookOpenCheck}
          title="Khóa học và phụ trách"
          description="Chọn nội dung học và người chịu trách nhiệm trước khi cấu hình lịch."
        >
          <FieldGroup className="grid gap-4 lg:grid-cols-2">
            <form.Field name="courseId">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0
                const selectedCourseLabel = field.state.value
                  ? courseOptions.find(
                      (courseOption) => courseOption.value === field.state.value
                    )?.label
                  : undefined

                return (
                  <Field
                    data-invalid={isInvalid}
                    className="rounded border border-border/70 bg-background p-4 data-[invalid=true]:border-destructive/50 data-[invalid=true]:bg-destructive/5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                        <BookOpenCheck className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1 space-y-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <FieldLabel>Khóa chính</FieldLabel>
                            <FieldDescription className="mt-1">
                              Dùng làm khung nội dung và tiến độ cho lớp.
                            </FieldDescription>
                          </div>
                          <Badge variant="secondary">
                            {courseOptions.length > 0
                              ? `${courseOptions.length} lựa chọn`
                              : "Chưa có dữ liệu"}
                          </Badge>
                        </div>

                        <Select
                          value={field.state.value ?? noneOptionValue}
                          onValueChange={(value) =>
                            field.handleChange(
                              value === noneOptionValue ? undefined : value
                            )
                          }
                        >
                          <SelectTrigger
                            className="w-full"
                            aria-invalid={isInvalid}
                          >
                            <SelectValue placeholder="Chọn khóa học" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={noneOptionValue}>
                              Chưa gắn khóa học
                            </SelectItem>
                            {courseOptions.map((courseOption) => (
                              <SelectItem
                                key={courseOption.value}
                                value={courseOption.value}
                              >
                                {courseOption.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <div className="flex items-start gap-2 rounded border border-border/70 bg-card px-3 py-2">
                          <Check
                            className={cn(
                              "mt-0.5 size-4 shrink-0",
                              selectedCourseLabel
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-muted-foreground">
                              Đang gắn
                            </p>
                            <p className="mt-0.5 text-sm leading-5 font-semibold break-words text-foreground">
                              {selectedCourseLabel ?? "Chưa gắn khóa học"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="instructorId">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0
                const instructorSelect = (
                  <Select
                    value={field.state.value || noneOptionValue}
                    onValueChange={(value) =>
                      field.handleChange(value === noneOptionValue ? "" : value)
                    }
                  >
                    <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                      <SelectValue placeholder="Chọn giáo viên" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={noneOptionValue}>
                        Chưa phân công
                      </SelectItem>
                      {instructorOptions.map((instructorOption) => (
                        <SelectItem
                          key={instructorOption.value}
                          value={instructorOption.value}
                        >
                          {instructorOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )

                const selectedInstructorLabel = field.state.value
                  ? instructorOptions.find(
                      (instructorOption) =>
                        instructorOption.value === field.state.value
                    )?.label
                  : undefined

                return (
                  <Field
                    data-invalid={isInvalid}
                    className="rounded border border-border/70 bg-background p-4 data-[invalid=true]:border-destructive/50 data-[invalid=true]:bg-destructive/5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                        <UserCheck className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1 space-y-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <FieldLabel>Giáo viên phụ trách</FieldLabel>
                            <FieldDescription className="mt-1">
                              Người quản lý lớp và theo dõi học viên.
                            </FieldDescription>
                          </div>
                          <Badge variant="secondary">
                            {instructorOptions.length > 0
                              ? `${instructorOptions.length} lựa chọn`
                              : "Chưa có dữ liệu"}
                          </Badge>
                        </div>

                        {instructorSelect}

                        <div className="flex items-start gap-2 rounded border border-border/70 bg-card px-3 py-2">
                          <Check
                            className={cn(
                              "mt-0.5 size-4 shrink-0",
                              selectedInstructorLabel
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-muted-foreground">
                              Phụ trách hiện tại
                            </p>
                            <p className="mt-0.5 text-sm leading-5 font-semibold break-words text-foreground">
                              {selectedInstructorLabel ?? "Chưa phân công"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
        </FormSection>

        <FormSection
          icon={CalendarDays}
          title="Lịch học"
          description="Tạo khung lịch mặc định để sinh buổi học sau khi API hỗ trợ."
        >
          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            <form.Field name="format">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid} className="sm:col-span-2">
                    <RequiredFieldLabel>Hình thức học</RequiredFieldLabel>
                    <RadioGroup
                      value={field.state.value}
                      orientation="horizontal"
                      onValueChange={(value) =>
                        field.handleChange(value as ClassFormat)
                      }
                    >
                      {classFormatOptions.map((modeOption) => (
                        <RadioOption
                          key={modeOption.value}
                          value={modeOption.value}
                          label={modeOption.label}
                        />
                      ))}
                    </RadioGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="repeatDays">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid} className="sm:col-span-2">
                    <FieldLabel>Ngày học trong tuần</FieldLabel>
                    <div className="grid grid-cols-7 gap-2">
                      {classWeekdayOptions.map((weekdayOption) => {
                        const isSelected = field.state.value.includes(
                          weekdayOption.value
                        )

                        return (
                          <Button
                            key={weekdayOption.value}
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            aria-pressed={isSelected}
                            className="px-0"
                            onClick={() =>
                              field.handleChange(
                                toggleWeekday(
                                  field.state.value,
                                  weekdayOption.value
                                )
                              )
                            }
                          >
                            {weekdayOption.label}
                          </Button>
                        )
                      })}
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="startTime">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Giờ bắt đầu</FieldLabel>
                    <TimePicker
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="endTime">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Giờ kết thúc</FieldLabel>
                    <TimePicker
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="startDate">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Ngày bắt đầu</FieldLabel>
                    <DatePicker
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                      isInvalid={isInvalid}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="endDate">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Ngày kết thúc</FieldLabel>
                    <DatePicker
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                      isInvalid={isInvalid}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="meetingUrl">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Link học online
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="https://..."
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
        </FormSection>

        <FormSection
          icon={Users}
          title="Ghi danh và vận hành"
          description="Cấu hình sức chứa, cách nhận học viên và tự động hóa lớp."
        >
          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            <form.Field name="maxStudents">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <RequiredFieldLabel htmlFor={field.name}>
                      Sĩ số tối đa
                    </RequiredFieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={1}
                      max={500}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(Number(event.target.value))
                      }
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="joinPolicy">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <RequiredFieldLabel>Cách ghi danh</RequiredFieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(value as ClassJoinPolicy)
                      }
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={isInvalid}
                      >
                        <SelectValue placeholder="Chọn cách ghi danh" />
                      </SelectTrigger>
                      <SelectContent>
                        {classJoinPolicyOptions.map((modeOption) => (
                          <SelectItem
                            key={modeOption.value}
                            value={modeOption.value}
                          >
                            {modeOption.label}
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

            <div className="grid gap-3 sm:col-span-2">
              <form.Field name="waitlistEnabled">
                {(field) => (
                  <ToggleRow
                    title="Cho phép danh sách chờ"
                    description="Nhận học viên chờ khi lớp đã đủ sĩ số."
                    checked={field.state.value}
                    onChange={field.handleChange}
                  />
                )}
              </form.Field>

              <form.Field name="reminderEnabled">
                {(field) => (
                  <ToggleRow
                    title="Gửi nhắc lịch trước buổi học"
                    description="Chuẩn bị sẵn cấu hình nhắc lịch cho học viên và giáo viên."
                    checked={field.state.value}
                    onChange={field.handleChange}
                  />
                )}
              </form.Field>

              <form.Field name="autoCreateSessions">
                {(field) => (
                  <ToggleRow
                    title="Sinh buổi học từ lịch mặc định"
                    description="Dùng ngày học và khung giờ để tạo session sau khi API hỗ trợ."
                    checked={field.state.value}
                    onChange={field.handleChange}
                  />
                )}
              </form.Field>
            </div>

            <form.Field name="note">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid} className="sm:col-span-2">
                    <FieldLabel htmlFor={field.name}>
                      Ghi chú vận hành
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Ghi chú yêu cầu phòng học, tài liệu, nhóm học viên..."
                      className="min-h-32 resize-y"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
        </FormSection>

        {submitError ? <FieldError>{submitError}</FieldError> : null}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <div className="flex flex-col-reverse gap-3 border-t border-border/80 bg-background pt-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() =>
                  router.push(`/manage/classes/${classDetail.code}`)
                }
              >
                Hủy bỏ
              </Button>
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? "Đang cập nhật..." : "Cập nhật lớp học"}
              </Button>
            </div>
          )}
        </form.Subscribe>
      </div>

      <form.Subscribe selector={(state) => state.values}>
        {(values) => (
          <ClassPreview
            values={values}
            courseLabel={
              values.courseId
                ? courseOptions.find(
                    (courseOption) => courseOption.value === values.courseId
                  )?.label
                : undefined
            }
            showCourse
            instructorLabel={
              values.instructorId
                ? instructorOptions.find(
                    (instructorOption) =>
                      instructorOption.value === values.instructorId
                  )?.label
                : undefined
            }
          />
        )}
      </form.Subscribe>
    </form>
  )
}

type FormSectionProps = {
  icon: typeof GraduationCap
  title: string
  description?: string
  children: ReactNode
}

function FormSection({
  icon: Icon,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded border border-border/80 bg-card shadow-xs">
      <div className="flex items-start gap-3 border-b border-border/70 p-5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <h2 className="text-base leading-6 font-semibold text-foreground">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  )
}

function RadioOption({ value, label }: { value: string; label: string }) {
  return (
    <label className="flex items-center gap-2 rounded border border-border/70 px-3 py-2 text-sm font-medium text-foreground">
      <RadioGroupItem value={value} />
      {label}
    </label>
  )
}

type ToggleRowProps = {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function ToggleRow({ title, description, checked, onChange }: ToggleRowProps) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      className={cn(
        "flex w-full items-start justify-between gap-4 rounded border px-4 py-3 text-left transition-colors",
        checked
          ? "border-primary/35 bg-primary/5 text-foreground"
          : "border-border/70 bg-background text-foreground hover:bg-muted/30"
      )}
      onClick={() => onChange(!checked)}
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
          {description}
        </span>
      </span>
      <span
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded border",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background text-transparent"
        )}
      >
        <Check className="size-3.5" />
      </span>
    </button>
  )
}

type ClassPreviewProps = {
  values: UpdateClassInput
  courseLabel?: string
  showCourse: boolean
  instructorLabel?: string
}

function ClassPreview({
  values,
  courseLabel,
  showCourse,
  instructorLabel,
}: ClassPreviewProps) {
  const statusLabel = getOptionLabel(classStatusOptions, values.status)
  const formatLabel = getOptionLabel(classFormatOptions, values.format)
  const joinPolicyLabel = getOptionLabel(
    classJoinPolicyOptions,
    values.joinPolicy
  )
  const repeatDayLabels = values.repeatDays
    .map((day) => getOptionLabel(classWeekdayOptions, day))
    .join(", ")

  return (
    <aside className="xl:sticky xl:top-5 xl:self-start">
      <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Xem trước lớp học
            </p>
            <h2 className="mt-2 truncate text-xl leading-7 font-semibold text-foreground">
              {values.name || "Tên lớp học"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {values.code || "Mã lớp"}
            </p>
          </div>
          <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
            {statusLabel}
          </span>
        </div>

        <Separator className="my-5" />

        <div className="grid gap-4">
          {showCourse ? (
            <PreviewRow
              icon={BookOpenCheck}
              label="Khóa chính"
              value={courseLabel ?? "Chưa gắn khóa học"}
            />
          ) : null}
          <PreviewRow
            icon={UserCheck}
            label="Giáo viên"
            value={instructorLabel ?? "Chưa phân công"}
          />
          <PreviewRow
            icon={CalendarDays}
            label="Lịch học"
            value={repeatDayLabels || "Chưa chọn ngày học"}
            helper={formatTimeRange(values.startTime, values.endTime)}
          />
          <PreviewRow
            icon={Clock3}
            label="Thời gian khóa"
            value={formatDateInputRange(values.startDate, values.endDate)}
          />
          <PreviewRow
            icon={Monitor}
            label="Hình thức"
            value={formatLabel}
            helper={values.meetingUrl || undefined}
          />
          <PreviewRow
            icon={Users}
            label="Ghi danh"
            value={`${values.maxStudents} học viên tối đa`}
            helper={joinPolicyLabel}
          />
          <PreviewRow
            icon={Bell}
            label="Tự động hóa"
            value={formatAutomationSummary(values)}
          />
        </div>
      </section>
    </aside>
  )
}

type PreviewRowProps = {
  icon: typeof GraduationCap
  label: string
  value: string
  helper?: string
}

function PreviewRow({ icon: Icon, label, value, helper }: PreviewRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm font-medium break-words text-foreground">
          {value}
        </p>
        {helper ? (
          <p className="mt-0.5 text-xs leading-5 break-words text-muted-foreground">
            {helper}
          </p>
        ) : null}
      </div>
    </div>
  )
}

type RequiredFieldLabelProps = {
  children: ReactNode
  htmlFor?: string
}

function RequiredFieldLabel({ children, htmlFor }: RequiredFieldLabelProps) {
  return (
    <FieldLabel htmlFor={htmlFor}>
      {children}
      <span className="text-destructive">*</span>
    </FieldLabel>
  )
}

function getClassFormValues(classDetail: ClassDetail): UpdateClassInput {
  return {
    code: classDetail.code,
    name: classDetail.name,
    courseId: classDetail.courses?.[0]?.courseId ?? undefined,
    instructorId: classDetail.instructor.id,
    maxStudents: classDetail.maxStudents,
    meetingUrl: classDetail.meetingUrl ?? "",
    startDate: toDateInputValue(classDetail.startDate),
    endDate: toDateInputValue(classDetail.endDate),
    startTime: classDetail.startTime ?? "19:00",
    endTime: classDetail.endTime ?? "20:30",
    repeatDays: classDetail.repeatDays,
    status: classDetail.status,
    format: classDetail.format,
    joinPolicy: classDetail.joinPolicy,
    waitlistEnabled: classDetail.waitlistEnabled,
    reminderEnabled: classDetail.reminderEnabled,
    autoCreateSessions: classDetail.autoCreateSessions,
    note: classDetail.note ?? "",
  }
}

function toDateInputValue(value: string | null) {
  return value?.slice(0, 10) ?? ""
}

function toggleWeekday(
  selectedWeekdays: ClassWeekday[],
  weekday: ClassWeekday
) {
  return selectedWeekdays.includes(weekday)
    ? selectedWeekdays.filter((selectedWeekday) => selectedWeekday !== weekday)
    : [...selectedWeekdays, weekday]
}

function getOptionLabel<TValue extends string>(
  options: Array<{ value: TValue; label: string }>,
  value: TValue
) {
  return options.find((option) => option.value === value)?.label ?? value
}

function formatTimeRange(startTime: string, endTime: string) {
  return (
    [startTime, endTime]
      .filter(Boolean)
      .map((time) =>
        DateTime.fromFormat(time.slice(0, 5), "HH:mm").toFormat("HH:mm")
      )
      .join(" - ") || "Chưa chọn giờ học"
  )
}

function formatDateInputRange(startDate: string, endDate: string) {
  const startDateLabel = formatDateInputLabel(startDate)
  const endDateLabel = formatDateInputLabel(endDate)

  if (!startDateLabel && !endDateLabel) {
    return "Chưa chọn ngày bắt đầu"
  }

  if (!endDateLabel) {
    return startDateLabel
  }

  if (!startDateLabel) {
    return endDateLabel
  }

  return `${startDateLabel} - ${endDateLabel}`
}

function formatDateInputLabel(date: string) {
  if (!date) {
    return ""
  }

  const parsedDate = DateTime.fromFormat(date, "yyyy-MM-dd", {
    locale: "vi-VN",
  })

  return parsedDate.isValid ? parsedDate.toFormat("dd/MM/yyyy") : date
}

function formatAutomationSummary(values: UpdateClassInput) {
  const enabledAutomations = [
    values.waitlistEnabled ? "Danh sách chờ" : undefined,
    values.reminderEnabled ? "Nhắc lịch" : undefined,
    values.autoCreateSessions ? "Sinh buổi học" : undefined,
  ].filter(Boolean)

  return enabledAutomations.length > 0
    ? enabledAutomations.join(", ")
    : "Chưa bật tự động hóa"
}
