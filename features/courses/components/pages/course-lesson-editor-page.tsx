import Link from "next/link"
import type { Route } from "next"
import {
  ArrowLeft,
  BookOpenText,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  Eye,
  FileQuestion,
  GripVertical,
  Layers3,
  PlaySquare,
  Plus,
  Save,
  Settings2,
  Sparkles,
  Trash2,
  Upload,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import type { Course, CourseLesson } from "../../constants/course-data"

type CourseLessonEditorPageProps = {
  course: Course
  lesson: CourseLesson
}

type Tone = "default" | "info" | "success" | "warning"

const theoryParts = [
  {
    title: "Mục tiêu bài học",
    helper: "Định nghĩa kết quả học viên cần đạt sau bài này.",
    status: "Hoàn chỉnh",
    tone: "success",
  },
  {
    title: "Nội dung chính",
    helper: "Sắp xếp ý chính theo trình tự giảng dạy.",
    status: "Đang soạn",
    tone: "info",
  },
  {
    title: "Ví dụ minh họa",
    helper: "Bổ sung tình huống, hình ảnh hoặc mẫu thực hành.",
    status: "Cần bổ sung",
    tone: "warning",
  },
] satisfies {
  title: string
  helper: string
  status: string
  tone: Tone
}[]

const exerciseQuestionNumbers = Array.from(
  { length: 10 },
  (_, questionIndex) => questionIndex + 1
)


const publishChecklist = [
  "Có mô tả và mục tiêu rõ ràng",
  "Có nội dung lý thuyết chính",
  "Có bài tập hoặc câu hỏi kiểm tra",
  "Đã rà soát thời lượng học",
]

export function CourseLessonEditorPage({
  course,
  lesson,
}: CourseLessonEditorPageProps) {
  const readinessPercent = getLessonReadinessPercent(lesson)
  const readinessBarClassName = getLessonReadinessBarClassName(lesson.status)
  const readinessIconClassName = getLessonReadinessIconClassName(lesson.status)

  return (
    <div className="grid gap-5">
      <Card className="overflow-hidden shadow-none">
        <CardHeader className="border-b border-border/70 bg-card">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="-ml-2"
                asChild
              >
                <Link
                  href={`/manage/courses/${course.courseCode}/lessons` as Route}
                >
                  <ArrowLeft className="size-4" />
                  Cấu trúc khóa học
                </Link>
              </Button>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary">
                  {course.courseCode}
                </span>
                <span className="rounded border border-border bg-card px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  {course.courseName}
                </span>
                <span className="rounded border border-border bg-card px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  {lesson.lessonCode}
                </span>
                <LessonStatusBadge status={lesson.status} />
              </div>

              <CardTitle className="mt-3 max-w-4xl text-2xl leading-8 font-bold tracking-normal lg:text-3xl lg:leading-10">
                {lesson.title}
              </CardTitle>
              <CardDescription className="mt-2 max-w-3xl text-sm leading-6">
                Biên soạn nội dung, học liệu và bài đánh giá cho bài học trong
                khóa {course.courseName}.
              </CardDescription>
            </div>

            <div className="grid shrink-0 gap-3 sm:min-w-80">
              <div className="rounded border border-border/80 bg-card p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Mức sẵn sàng xuất bản
                    </p>
                    <p className="text-lg leading-7 font-semibold text-foreground">
                      {readinessPercent}%
                    </p>
                  </div>
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded border",
                      readinessIconClassName
                    )}
                  >
                    <Sparkles className="size-4" />
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded bg-muted">
                  <div
                    className={cn("h-full rounded", readinessBarClassName)}
                    style={{ width: `${readinessPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:justify-end">
                <Button type="button" variant="outline">
                  <Eye className="size-4" />
                  Xem trước
                </Button>
                <Button type="button">
                  <Save className="size-4" />
                  Lưu bài học
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
          <LessonMetric
            icon={Clock3}
            label="Thời lượng"
            value={lesson.duration}
            helper="Theo cấu hình bài học"
          />
          <LessonMetric
            icon={BookOpenText}
            label="Loại bài"
            value={lesson.type}
            helper="Hình thức học chính"
            tone="info"
          />
          <LessonMetric
            icon={ClipboardList}
            label="Học liệu"
            value={`${lesson.resourceCount} mục`}
            helper="Theo bài học"
            tone="success"
          />
          <LessonMetric
            icon={CheckCircle2}
            label="Cập nhật"
            value={lesson.updatedAt}
            helper="Lần chỉnh gần nhất"
            tone="warning"
          />
        </CardContent>
      </Card>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <Tabs defaultValue="theory">
          <TabsList>
            <TabsTrigger value="theory">
              <Layers3 className="size-4" />
              Lý thuyết
            </TabsTrigger>
            <TabsTrigger value="simulation">
              <PlaySquare className="size-4" />
              Mô phỏng
            </TabsTrigger>
            <TabsTrigger value="exercise">
              <FileQuestion className="size-4" />
              Bài tập
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theory">
            <Card>
              <CardHeader className="border-b border-border/70 bg-card">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <SectionTitle
                    icon={Layers3}
                    title="Nội dung lý thuyết"
                    description="Các phần học chính được sắp theo trình tự giảng dạy."
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-primary/15 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary"
                  >
                    <Sparkles className="size-4" />
                    Gợi ý dàn ý
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-3">
                  {theoryParts.map((part, index) => (
                    <ContentBlock
                      key={part.title}
                      index={index + 1}
                      title={part.title}
                      helper={part.helper}
                      status={part.status}
                      tone={part.tone}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline">
                    <Plus className="size-4" />
                    Thêm phần lý thuyết
                  </Button>
                  <Button type="button" variant="ghost">
                    <Settings2 className="size-4" />
                    Cấu hình trình tự
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simulation">
            <Card>
              <CardHeader className="border-b border-border/70 bg-card">
                <SectionTitle
                  icon={BrainCircuit}
                  title="Mô phỏng tương tác"
                  description="Upload file HTML/ZIP, SCORM, H5P hoặc package mô phỏng tương tác."
                  iconClassName="border-success/25 bg-success/5 text-success"
                />
              </CardHeader>
              <CardContent className="grid gap-4">
                <SimulationUploadBlock
                  icon={BrainCircuit}
                  title="File mô phỏng tương tác"
                  helper="Upload HTML/ZIP, SCORM, H5P hoặc package mô phỏng tương tác."
                  inputId="interactive-simulation-file"
                  accept=".html,.htm,.zip,.h5p,.scorm,application/zip,application/x-zip-compressed,text/html"
                  buttonLabel="Tải file lên"
                  tone="success"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exercise">
            <Card>
              <CardHeader className="border-b border-border/70 bg-card">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <SectionTitle
                    icon={FileQuestion}
                    title="Bài tập 10 câu hỏi"
                    description="Mỗi bài học có một bài tập cuối bài để kiểm tra mức hiểu bài."
                  />
                  <Button type="button" size="sm">
                    <Settings2 className="size-4" />
                    Chỉnh sửa bài tập
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <LessonExercisePanel />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <aside className="grid content-start gap-5 xl:sticky xl:top-5">
          <Card>
            <CardHeader>
              <SectionTitle
                icon={Sparkles}
                title="Xuất bản"
                description="Trạng thái hiện tại của bài học."
                iconClassName={readinessIconClassName}
              />
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-4xl leading-none font-bold">
                    {readinessPercent}%
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Sẵn sàng cho học viên
                  </p>
                </div>
                <LessonStatusBadge status={lesson.status} />
              </div>
              <div className="h-2 overflow-hidden rounded bg-muted">
                <div
                  className={cn("h-full rounded", readinessBarClassName)}
                  style={{ width: `${readinessPercent}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionTitle
                icon={CheckCircle2}
                title="Checklist xuất bản"
                description="Các mục quan trọng trước khi mở bài."
                iconClassName="border-success/25 bg-success/5 text-success"
              />
            </CardHeader>
            <CardContent className="grid gap-2">
              {publishChecklist.map((checklistItem, checklistIndex) => (
                <PublishChecklistItem
                  key={checklistItem}
                  label={checklistItem}
                  index={checklistIndex + 1}
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionTitle
                icon={ChevronRight}
                title="Điều hướng"
                description="Các khu vực liên quan trong khóa học."
              />
            </CardHeader>
            <CardContent className="grid gap-2">
              <SidebarNavItem
                href={`/manage/courses/${course.courseCode}/lessons` as Route}
                icon={Layers3}
                label="Cấu trúc khóa học"
                helper="Danh sách chương và bài"
              />
              <SidebarNavItem
                href={
                  `/manage/courses/${course.courseCode}/assignments` as Route
                }
                icon={FileQuestion}
                label="Bài tập trong khóa"
                helper="Quản lý bài tập liên quan"
              />
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  )
}

function PublishChecklistItem({
  label,
  index,
}: {
  label: string
  index: number
}) {
  return (
    <div className="group flex items-start gap-3 rounded border border-border/70 bg-card p-3 text-sm transition-colors hover:border-success/25 hover:bg-success/5">
      <span className="grid size-7 shrink-0 place-items-center rounded border border-success/25 bg-success/5 text-success">
        <CheckCircle2 className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-success">
            Hoàn tất
          </span>
          <span className="text-[11px] font-medium text-muted-foreground">
            {index}/4
          </span>
        </div>
        <p className="mt-1 leading-5 text-muted-foreground group-hover:text-foreground">
          {label}
        </p>
      </div>
    </div>
  )
}

function SidebarNavItem({
  href,
  icon: Icon,
  label,
  helper,
}: {
  href: Route
  icon: LucideIcon
  label: string
  helper: string
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded border border-border/70 bg-card p-3 text-sm transition-colors hover:border-primary/20 hover:bg-primary/5"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded border border-border bg-muted/30 text-muted-foreground group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold text-foreground">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
          {helper}
        </span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  )
}

function SectionTitle({
  icon: Icon,
  title,
  description,
  iconClassName,
}: {
  icon: LucideIcon
  title: string
  description: string
  iconClassName?: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded border",
          iconClassName ?? "border-primary/15 bg-primary/5 text-primary"
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="mt-1">{description}</CardDescription>
      </div>
    </div>
  )
}

function ContentBlock({
  index,
  title,
  helper,
  status,
  tone,
}: {
  index: number
  title: string
  helper: string
  status: string
  tone: Tone
}) {
  const fileInputId = `theory-part-file-${index}`

  return (
    <div className="rounded border border-border/80 bg-card p-3">
      <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <GripVertical className="hidden size-4 sm:block" />
          <span
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded border text-xs font-bold",
              tone === "success" &&
                "border-success/25 bg-success/5 text-success",
              tone === "info" &&
                "border-secondary/25 bg-secondary/5 text-secondary",
              tone === "warning" &&
                "border-tertiary/25 bg-tertiary/5 text-tertiary",
              tone === "default" &&
                "border-primary/25 bg-primary/5 text-primary"
            )}
          >
            {index}
          </span>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <span
              className={cn(
                "rounded border px-2 py-0.5 text-[11px] font-semibold",
                tone === "success" &&
                  "border-success/25 bg-success/5 text-success",
                tone === "info" &&
                  "border-secondary/25 bg-secondary/5 text-secondary",
                tone === "warning" &&
                  "border-tertiary/25 bg-tertiary/5 text-tertiary",
                tone === "default" &&
                  "border-primary/25 bg-primary/5 text-primary"
              )}
            >
              {status}
            </span>
          </div>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {helper}
          </p>
        </div>
        <div className="flex gap-1 sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings2 className="size-4" />
            Sửa
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
            Xóa
          </Button>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 rounded border border-dashed border-border bg-card p-3 sm:ml-14 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded border border-primary/15 bg-primary/5 text-primary">
            <Upload className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              File PDF/Word cho phần này
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Hỗ trợ PDF, DOC và DOCX.
            </p>
          </div>
        </div>
        <input
          id={fileInputId}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          multiple
          className="sr-only"
        />
        <Button variant="outline" size="sm" asChild>
          <label htmlFor={fileInputId}>
            <Upload className="size-4" />
            Đẩy file lên
          </label>
        </Button>
      </div>
    </div>
  )
}

function SimulationUploadBlock({
  icon: Icon,
  title,
  helper,
  inputId,
  accept,
  buttonLabel,
  tone,
}: {
  icon: LucideIcon
  title: string
  helper: string
  inputId: string
  accept: string
  buttonLabel: string
  tone: Tone
}) {
  return (
    <div className="grid gap-4 rounded border border-border bg-card p-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="grid content-start gap-4">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded border",
              tone === "info" &&
                "border-secondary/25 bg-secondary/5 text-secondary",
              tone === "success" &&
                "border-success/25 bg-success/5 text-success",
              tone === "warning" &&
                "border-tertiary/25 bg-tertiary/5 text-tertiary",
              tone === "default" &&
                "border-primary/25 bg-primary/5 text-primary"
            )}
          >
            <Icon className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {helper}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {["HTML", "ZIP", "SCORM", "H5P"].map((format) => (
            <span
              key={format}
              className="rounded border border-border bg-muted/30 px-2 py-1 text-xs font-semibold text-muted-foreground"
            >
              {format}
            </span>
          ))}
        </div>

        <div className="rounded border border-dashed border-border p-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">
                Chọn package mô phỏng
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Có thể upload nhiều file nếu package cần tài nguyên đi kèm.
              </p>
            </div>
            <input
              id={inputId}
              type="file"
              accept={accept}
              multiple
              className="sr-only"
            />
            <Button variant="outline" size="sm" className="w-fit" asChild>
              <label htmlFor={inputId}>
                <Upload className="size-4" />
                {buttonLabel}
              </label>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid min-h-56 content-center justify-items-center gap-3 rounded border border-border bg-muted/20 p-4 text-center">
        <span className="grid size-11 place-items-center rounded border border-border bg-card text-muted-foreground">
          <Eye className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Preview mô phỏng
          </p>
          <p className="mt-1 max-w-60 text-xs leading-5 text-muted-foreground">
            Sau khi upload, có thể xem thử mô phỏng trước khi lưu bài học.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" disabled>
          <Eye className="size-4" />
          Xem preview
        </Button>
      </div>
    </div>
  )
}

function LessonExercisePanel() {
  return (
    <div className="grid gap-4 rounded border border-border/80 bg-card p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded border border-primary/25 bg-primary/5 text-primary">
            <FileQuestion className="size-4" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-foreground">
                Bài tập cuối bài
              </p>
              <span className="rounded border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] font-semibold text-primary">
                10 câu hỏi
              </span>
              <span className="rounded border border-success/25 bg-success/5 px-2 py-0.5 text-[11px] font-semibold text-success">
                Tự động chấm
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Một bộ câu hỏi duy nhất gắn với bài học này. Học viên hoàn thành
              sau khi học xong lý thuyết và mô phỏng.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm">
            <Eye className="size-4" />
            Xem preview
          </Button>
          <Button type="button" variant="outline" size="sm">
            <Settings2 className="size-4" />
            Cấu hình
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <ExerciseSummaryItem label="Số câu" value="10" helper="Cố định" />
        <ExerciseSummaryItem label="Điểm tối đa" value="10" helper="1 điểm/câu" />
        <ExerciseSummaryItem label="Điểm đạt" value="7/10" helper="70%" />
      </div>

      <div className="rounded border border-border/80 bg-card">
        <div className="flex flex-col gap-2 border-b border-border/70 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Danh sách câu hỏi
            </p>
            <p className="text-xs text-muted-foreground">
              Quản lý nhanh 10 câu hỏi của bài tập.
            </p>
          </div>
          <span className="w-fit rounded border border-border bg-muted/30 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            10/10 câu
          </span>
        </div>
        <div className="grid gap-2 p-3 sm:grid-cols-2 xl:grid-cols-5">
          {exerciseQuestionNumbers.map((questionNumber) => (
            <div
              key={questionNumber}
              className="flex items-center gap-2 rounded border border-border/70 bg-card p-2"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded border border-primary/20 bg-primary/5 text-xs font-bold text-primary">
                {questionNumber}
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-foreground">
                  Câu {questionNumber}
                </p>
                <p className="text-[11px] text-muted-foreground">1 điểm</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ExerciseSummaryItem({
  label,
  value,
  helper,
}: {
  label: string
  value: string
  helper: string
}) {
  return (
    <div className="rounded border border-border/80 bg-card p-3">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg leading-7 font-semibold text-foreground">
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{helper}</p>
    </div>
  )
}

function LessonMetric({
  icon: Icon,
  label,
  value,
  helper,
  tone = "default",
}: {
  icon: LucideIcon
  label: string
  value: string
  helper: string
  tone?: Tone
}) {
  return (
    <div className="rounded border border-border/80 bg-card p-3">
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded border",
            tone === "default" && "border-primary/25 bg-primary/5 text-primary",
            tone === "info" && "border-secondary/25 bg-secondary/5 text-secondary",
            tone === "success" &&
              "border-success/25 bg-success/5 text-success",
            tone === "warning" &&
              "border-tertiary/25 bg-tertiary/5 text-tertiary"
          )}
        >
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="truncate text-sm font-semibold text-foreground">
            {value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
        </div>
      </div>
    </div>
  )
}

function LessonStatusBadge({ status }: { status: CourseLesson["status"] }) {
  const statusMap = {
    published: {
      label: "Đã mở",
      className: "border-success/25 bg-success/5 text-success",
    },
    draft: {
      label: "Bản nháp",
      className: "border-tertiary/25 bg-tertiary/5 text-tertiary",
    },
    locked: {
      label: "Đã khóa",
      className: "border-border bg-card text-muted-foreground",
    },
  } satisfies Record<
    CourseLesson["status"],
    { label: string; className: string }
  >
  const currentStatus = statusMap[status]

  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded border px-2.5 text-xs font-semibold",
        currentStatus.className
      )}
    >
      {currentStatus.label}
    </span>
  )
}

function getLessonReadinessPercent(lesson: CourseLesson) {
  if (lesson.status === "published") return 100
  if (lesson.status === "locked") return 64

  return lesson.resourceCount > 1 ? 82 : 72
}

function getLessonReadinessBarClassName(status: CourseLesson["status"]) {
  const statusMap = {
    published: "bg-success",
    draft: "bg-primary",
    locked: "bg-muted-foreground",
  } satisfies Record<CourseLesson["status"], string>

  return statusMap[status]
}

function getLessonReadinessIconClassName(status: CourseLesson["status"]) {
  const statusMap = {
    published: "border-success/25 bg-success/5 text-success",
    draft: "border-primary/15 bg-primary/5 text-primary",
    locked: "border-border bg-muted/30 text-muted-foreground",
  } satisfies Record<CourseLesson["status"], string>

  return statusMap[status]
}
