"use client"

import Link from "next/link"
import type { Route } from "next"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import {
  ArrowLeft,
  BookOpenCheck,
  Check,
  Layers3,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { useAppForm } from "@/components/form/app-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
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
import { cn } from "@/lib/utils"
import { addClassCourse } from "../../actions/add-class-course"
import {
  addClassCourseSchema,
  type AddClassCourseInput,
} from "../../schemas/class.schema"
import type { ClassCourse, ClassDetail, ClassFormOption } from "../../types"

type AddCourseToClassPageProps = {
  classDetail: ClassDetail
  courseOptions: ClassFormOption[]
}

const addClassCourseDefaultValues: AddClassCourseInput = {
  courseId: "",
  required: true,
}

export function AddCourseToClassPage({
  classDetail,
  courseOptions,
}: AddCourseToClassPageProps) {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [courseSearch, setCourseSearch] = useState("")
  const attachedCourses = useMemo(
    () => classDetail.courses ?? [],
    [classDetail.courses]
  )
  const attachedCourseIdSet = useMemo(
    () => new Set(attachedCourses.map((course) => course.courseId)),
    [attachedCourses]
  )
  const availableCourseOptions = useMemo(
    () =>
      courseOptions.filter(
        (courseOption) => !attachedCourseIdSet.has(courseOption.value)
      ),
    [attachedCourseIdSet, courseOptions]
  )
  const filteredCourseOptions = useMemo(() => {
    const normalizedSearch = courseSearch.trim().toLowerCase()

    if (!normalizedSearch) return availableCourseOptions

    return availableCourseOptions.filter((courseOption) =>
      [courseOption.label, courseOption.description]
        .filter(Boolean)
        .some((courseText) =>
          courseText?.toLowerCase().includes(normalizedSearch)
        )
    )
  }, [availableCourseOptions, courseSearch])

  const form = useAppForm({
    defaultValues: addClassCourseDefaultValues,
    validators: {
      onSubmit: addClassCourseSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      const addClassCourseResult = await addClassCourse({
        classCode: classDetail.code,
        input: value,
      })

      if (!addClassCourseResult.success) {
        setSubmitError(
          addClassCourseResult.message ?? "Không thể thêm khóa học vào lớp."
        )
        return
      }

      router.push(`/manage/classes/${classDetail.code}`)
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
        <AddClassCourseHeader classCode={classDetail.code} />

        <section className="grid gap-3 sm:grid-cols-3">
          <SummaryCard
            icon={BookOpenCheck}
            label="Đã gắn"
            value={attachedCourses.length.toString()}
            helper="Trong lớp hiện tại"
          />
          <SummaryCard
            icon={Layers3}
            label="Có thể thêm"
            value={availableCourseOptions.length.toString()}
            helper="Chưa nằm trong lớp"
          />
          <SummaryCard
            icon={ShieldCheck}
            label="Bắt buộc"
            value={attachedCourses
              .filter((course) => course.required)
              .length.toString()}
            helper="Đang tính vào lộ trình"
          />
        </section>

        <Card className="border-border/80 shadow-xs">
          <CardHeader className="border-b border-border/70">
            <CardTitle>Thiết lập khóa học</CardTitle>
            <CardDescription>
              Danh sách chỉ hiện các khóa chưa được gắn vào lớp này.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            {submitError ? (
              <Alert variant="destructive">
                <AlertTitle>Lưu thất bại</AlertTitle>
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            ) : null}

            {availableCourseOptions.length > 0 ? (
              <>
                <form.Field name="courseId">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    const selectedCourse = availableCourseOptions.find(
                      (courseOption) => courseOption.value === field.state.value
                    )

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Khóa học</FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={field.handleChange}
                        >
                          <SelectTrigger
                            id={field.name}
                            name={field.name}
                            className="w-full"
                            aria-invalid={isInvalid}
                          >
                            <SelectValue placeholder="Chọn khóa học để thêm" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCourseOptions.map((courseOption) => (
                              <SelectItem
                                key={courseOption.value}
                                value={courseOption.value}
                              >
                                {courseOption.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldDescription>
                          {selectedCourse?.description ??
                            "Có thể chọn nhanh từ danh sách khóa học bên dưới."}
                        </FieldDescription>
                        {isInvalid ? (
                          <FieldError errors={field.state.meta.errors} />
                        ) : null}
                      </Field>
                    )
                  }}
                </form.Field>

                <form.Field name="required">
                  {(field) => (
                    <Field>
                      <FieldLabel>Vai trò trong lớp</FieldLabel>
                      <RadioGroup
                        className="grid gap-3 md:grid-cols-2"
                        value={field.state.value ? "required" : "optional"}
                        onValueChange={(value) =>
                          field.handleChange(value === "required")
                        }
                      >
                        <CourseRoleOption
                          id="class-course-required"
                          value="required"
                          title="Bắt buộc"
                          description="Tính vào lộ trình chính và tiến độ lớp."
                        />
                        <CourseRoleOption
                          id="class-course-optional"
                          value="optional"
                          title="Bổ trợ"
                          description="Dùng làm học liệu tham khảo hoặc mở rộng."
                        />
                      </RadioGroup>
                    </Field>
                  )}
                </form.Field>

                <Separator />

                <form.Field name="courseId">
                  {(field) => (
                    <div className="grid gap-3">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <h2 className="text-sm font-semibold text-foreground">
                            Chọn nhanh từ kho khóa học
                          </h2>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Nhấn vào một khóa để đưa vào form phía trên.
                          </p>
                        </div>
                        <div className="relative w-full sm:w-72">
                          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            value={courseSearch}
                            onChange={(event) =>
                              setCourseSearch(event.target.value)
                            }
                            className="pl-9"
                            placeholder="Tìm theo mã hoặc tên khóa"
                          />
                        </div>
                      </div>

                      {filteredCourseOptions.length > 0 ? (
                        <div className="grid gap-3 lg:grid-cols-2">
                          {filteredCourseOptions.map((courseOption) => {
                            const isSelected =
                              field.state.value === courseOption.value

                            return (
                              <button
                                key={courseOption.value}
                                type="button"
                                className={cn(
                                  "rounded border border-border/70 bg-background p-4 text-left transition hover:border-primary/40 hover:bg-primary/5 active:translate-y-px",
                                  isSelected &&
                                    "border-primary/50 bg-primary/10 ring-1 ring-primary/20"
                                )}
                                onClick={() => field.handleChange(courseOption.value)}
                              >
                                <div className="flex items-start gap-3">
                                  <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                                    {isSelected ? (
                                      <Check className="size-4" />
                                    ) : (
                                      <BookOpenCheck className="size-4" />
                                    )}
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-sm leading-5 font-semibold text-foreground">
                                      {courseOption.label}
                                    </span>
                                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                      {courseOption.description ??
                                        "Chưa có mô tả khóa học."}
                                    </span>
                                  </span>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="rounded border border-border/70 bg-muted/30 px-4 py-6 text-sm text-muted-foreground">
                          Không tìm thấy khóa phù hợp với từ khóa hiện tại.
                        </div>
                      )}
                    </div>
                  )}
                </form.Field>
              </>
            ) : (
              <Alert>
                <Sparkles className="size-4" />
                <AlertTitle>Không còn khóa học để thêm</AlertTitle>
                <AlertDescription>
                  Tất cả khóa học trong kho hiện đã được gắn vào lớp này hoặc
                  danh sách khóa học chưa có dữ liệu.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      <aside className="grid gap-5 xl:sticky xl:top-5 xl:self-start">
        <Card className="border-border/80 shadow-xs">
          <CardHeader>
            <CardTitle>Thông tin lớp</CardTitle>
            <CardDescription>{classDetail.name}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <InfoRow label="Giáo viên" value={classDetail.instructor.fullName} />
            <InfoRow
              label="Sĩ số"
              value={`${classDetail.studentCount ?? 0}/${classDetail.maxStudents}`}
            />
            <InfoRow label="Lịch học" value={classDetail.schedule ?? "Chưa đặt"} />
            <InfoRow
              label="Thời gian"
              value={
                classDetail.startDate && classDetail.endDate
                  ? `${classDetail.startDate} - ${classDetail.endDate}`
                  : "Chưa đặt"
              }
            />
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-xs">
          <CardHeader>
            <CardTitle>Khóa đã có</CardTitle>
            <CardDescription>
              Dùng để kiểm tra trùng lặp trước khi thêm.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {attachedCourses.length > 0 ? (
              <div className="grid gap-3">
                {attachedCourses.slice(0, 5).map((course) => (
                  <AttachedCourseRow key={course.courseId} course={course} />
                ))}
                {attachedCourses.length > 5 ? (
                  <p className="text-xs font-medium text-muted-foreground">
                    Còn {attachedCourses.length - 5} khóa khác trong lớp.
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="rounded border border-border/70 bg-muted/30 px-3 py-3 text-sm leading-6 text-muted-foreground">
                Lớp chưa có khóa học nào. Khóa đầu tiên nên đặt là bắt buộc.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="rounded border border-border/80 bg-card p-4 shadow-xs">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                className="w-full"
                disabled={
                  !canSubmit ||
                  isSubmitting ||
                  availableCourseOptions.length === 0
                }
              >
                <Plus className="size-4" />
                {isSubmitting ? "Đang thêm..." : "Thêm khóa học"}
              </Button>
            )}
          </form.Subscribe>
          <Button type="button" variant="outline" className="mt-2 w-full" asChild>
            <Link href={`/manage/classes/${classDetail.code}` as Route}>
              Hủy thao tác
            </Link>
          </Button>
        </div>
      </aside>
    </form>
  )
}

function AddClassCourseHeader({ classCode }: { classCode: string }) {
  return (
    <Card className="border-border/80 shadow-xs">
      <CardContent>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h1 className="mt-3 text-2xl leading-8 font-bold text-foreground">
              Thêm khóa học vào lớp
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Chọn khóa học, đặt vai trò trong lộ trình và kiểm tra nội dung đã
              gắn trước khi lưu.
            </p>
          </div>
          <Button type="button" variant="outline" asChild>
            <Link href={`/manage/classes/${classCode}` as Route}>
              <ArrowLeft className="size-4" />
              Về chi tiết lớp
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: LucideIcon
  label: string
  value: string
  helper: string
}) {
  return (
    <section className="rounded border border-border/80 bg-card p-4 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
      </div>
    </section>
  )
}

function CourseRoleOption({
  id,
  value,
  title,
  description,
}: {
  id: string
  value: string
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 rounded border border-border/70 bg-background p-4">
      <RadioGroupItem id={id} value={value} className="mt-1" />
      <div className="min-w-0">
        <FieldLabel htmlFor={id}>{title}</FieldLabel>
        <FieldDescription className="mt-1">{description}</FieldDescription>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded border border-border/70 bg-background px-3 py-2">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm leading-5 font-medium break-words text-foreground">
        {value}
      </p>
    </div>
  )
}

function AttachedCourseRow({ course }: { course: ClassCourse }) {
  return (
    <div className="rounded border border-border/70 bg-background p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm leading-5 font-semibold break-words text-foreground">
            {course.courseName}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {course.courseCode} - {course.completedLessons}/{course.lessonCount} bài
          </p>
        </div>
        <Badge variant={course.required ? "default" : "secondary"}>
          {course.required ? "Bắt buộc" : "Bổ trợ"}
        </Badge>
      </div>
    </div>
  )
}
