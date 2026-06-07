"use client"

import Link from "next/link"
import type { Route } from "next"
import {
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Layers3,
  PlaySquare,
  Save,
  Sparkles,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { formatNumber } from "@/lib/number.util"
import { cn } from "@/lib/utils"
import type { Course, CourseLesson } from "../../constants/course-data"

type CourseLessonsPageProps = {
  course: Course
}

type ChapterNode = {
  code: string
  title: string
  lessons: CourseLesson[]
}

const lessonComposerBlueprint = [
  { label: "Lý thuyết", value: "Nhiều part", icon: Layers3 },
  { label: "Mô phỏng", value: "1 mô phỏng", icon: PlaySquare },
  { label: "Bài tập", value: "10 câu hỏi", icon: FileQuestion },
]

export function CourseLessonsPage({ course }: CourseLessonsPageProps) {
  const chapterNodes = createLessonTree(course)
  const publishedLessonCount = course.lessons.filter(
    (lesson) => lesson.status === "published"
  ).length
  const resourceCount = course.lessons.reduce(
    (total, lesson) => total + lesson.resourceCount,
    0
  )

  return (
    <div className="grid gap-5">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                  {course.courseCode}
                </span>
                <span className="rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80">
                  {course.category}
                </span>
              </div>
              <CardTitle className="text-xl leading-7">
                Biên soạn khóa học
              </CardTitle>
              <CardDescription className="mt-2 max-w-3xl">
                Chỉnh thông tin cơ bản của khóa học. Nội dung chi tiết nằm trong
                từng bài học.
              </CardDescription>
            </div>

            <Button type="button">
              <Save className="size-4" />
              Lưu thông tin
            </Button>
          </div>
        </CardHeader>
      </Card>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={BookOpenCheck}
          label="Bài học"
          value={formatNumber(course.lessons.length)}
          helper="Trong khóa học"
        />
        <MetricCard
          icon={CheckCircle2}
          label="Đã mở"
          value={formatNumber(publishedLessonCount)}
          helper="Học viên có thể học"
          tone="success"
        />
        <MetricCard
          icon={Clock3}
          label="Thời lượng"
          value={course.duration}
          helper="Theo cấu hình hiện tại"
          tone="warning"
        />
        <MetricCard
          icon={Sparkles}
          label="Học liệu"
          value={formatNumber(resourceCount)}
          helper="Tài nguyên đính kèm"
          tone="info"
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>
                Phần này chỉ quản lý dữ liệu tổng quan của một khóa học.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="courseCode">Mã khóa học</FieldLabel>
                  <Input id="courseCode" defaultValue={course.courseCode} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="courseName">Tên khóa học</FieldLabel>
                  <Input id="courseName" defaultValue={course.courseName} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="category">Danh mục</FieldLabel>
                  <Input id="category" defaultValue={course.category} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="level">Cấp độ</FieldLabel>
                  <Input id="level" defaultValue={course.level} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="duration">Thời lượng</FieldLabel>
                  <Input id="duration" defaultValue={course.duration} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="startDate">Ngày khai giảng</FieldLabel>
                  <Input id="startDate" defaultValue={course.startDate} />
                </Field>
                <Field className="sm:col-span-2">
                  <FieldLabel htmlFor="description">Mô tả</FieldLabel>
                  <Textarea
                    id="description"
                    rows={4}
                    defaultValue={course.description}
                  />
                </Field>
                <Field className="sm:col-span-2">
                  <FieldLabel htmlFor="audience">Đối tượng học viên</FieldLabel>
                  <Textarea
                    id="audience"
                    rows={3}
                    defaultValue={course.audience}
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border/70 bg-muted/25">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle>Bài học trong khóa</CardTitle>
                  <CardDescription className="mt-2">
                    Mỗi bài học có luồng biên soạn riêng cho lý thuyết, mô phỏng
                    và bài tập.
                  </CardDescription>
                </div>
                <span className="w-fit rounded bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border">
                  {chapterNodes.length} chương · {course.lessons.length} bài
                </span>
              </div>
            </CardHeader>
            <CardContent className="bg-background/70 p-4">
              <Accordion
                type="multiple"
                defaultValue={chapterNodes.map((chapter) => chapter.code)}
                className="grid gap-3"
              >
                {chapterNodes.map((chapter, index) => (
                  <ChapterTreeNode
                    key={chapter.code}
                    courseCode={course.courseCode}
                    chapter={chapter}
                    index={index}
                  />
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <aside className="grid content-start gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Cấu trúc mỗi bài</CardTitle>
              <CardDescription>
                Khi bấm biên soạn bài học, màn hình tiếp theo chia nội dung theo
                3 phần.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {lessonComposerBlueprint.map((section) => {
                const Icon = section.icon

                return (
                  <div
                    key={section.label}
                    className="flex items-center gap-3 rounded border border-border/70 bg-background p-3"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded bg-primary/10 text-primary ring-1 ring-primary/15">
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {section.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {section.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card data-tone="warning">
            <CardHeader>
              <CardTitle>Ghi chú API</CardTitle>
              <CardDescription>
                Trang này cần API cập nhật thông tin khóa học và API riêng cho
                nội dung từng bài.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 text-sm text-muted-foreground">
                <p>PATCH thông tin cơ bản khóa học.</p>
                <p>GET/PUT nội dung chi tiết theo từng bài học.</p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  )
}

function createLessonTree(course: Course): ChapterNode[] {
  const midpoint = Math.max(1, Math.ceil(course.lessons.length / 2))
  const lessonGroups = [
    course.lessons.slice(0, midpoint),
    course.lessons.slice(midpoint),
  ].filter((lessons) => lessons.length > 0)

  return lessonGroups.map((lessons, index) => ({
    code: `${course.courseCode}-C${index + 1}`,
    title:
      index === 0 ? "Chương 1: Nền tảng" : "Chương 2: Luyện tập và ứng dụng",
    lessons,
  }))
}

function ChapterTreeNode({
  courseCode,
  chapter,
  index,
}: {
  courseCode: string
  chapter: ChapterNode
  index: number
}) {
  return (
    <AccordionItem
      value={chapter.code}
      className="overflow-hidden rounded border border-border/80 bg-card shadow-xs not-last:border-b-border/80"
    >
      <AccordionTrigger className="bg-muted/35 px-4 py-4 transition-colors hover:bg-muted/55 hover:no-underline">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded bg-primary text-xs font-bold text-primary-foreground shadow-sm shadow-primary/20">
            {index + 1}
          </span>
          <div className="min-w-0 text-left">
            <h3 className="truncate text-sm font-bold text-foreground">
              {chapter.title}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium">{chapter.code}</span>
              <span className="size-1 rounded-full bg-border" />
              <span>{chapter.lessons.length} bài học</span>
            </div>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="grid h-auto gap-2 border-t border-border/70 bg-muted/20 p-3 pb-3">
        {chapter.lessons.map((lesson, lessonIndex) => (
          <LessonRow
            key={lesson.lessonCode}
            courseCode={courseCode}
            lesson={lesson}
            index={lessonIndex}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

function LessonRow({
  courseCode,
  lesson,
  index,
}: {
  courseCode: string
  lesson: CourseLesson
  index: number
}) {
  return (
    <div className="grid gap-3 rounded border border-l-2 border-border/70 border-l-transparent bg-background p-3 shadow-xs transition-all hover:border-primary/25 hover:border-l-primary hover:shadow-sm lg:grid-cols-[3.5rem_minmax(0,1fr)_7rem_7rem_auto] lg:items-center">
      <span className="grid size-8 place-items-center rounded bg-muted text-xs font-bold text-muted-foreground ring-1 ring-border">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">
          {lesson.title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {lesson.lessonCode} · {lesson.resourceCount} học liệu
        </p>
      </div>
      <span
        className={cn(
          "rounded px-2.5 py-1 text-xs font-semibold ring-1",
          getLessonTypeClassName(lesson.type)
        )}
      >
        {lesson.type}
      </span>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
        <Clock3 className="size-3.5" />
        {lesson.duration}
      </span>
      <Button type="button" variant="outline" size="sm" asChild>
        <Link
          href={
            `/manage/courses/${courseCode}/lessons/${lesson.lessonCode}` as Route
          }
          className="justify-self-start lg:justify-self-end"
        >
          <BrainCircuit className="size-4" />
          Biên soạn
        </Link>
      </Button>
    </div>
  )
}

function getLessonTypeClassName(type: string) {
  const lowerType = type.toLowerCase()

  if (lowerType.includes("video")) {
    return "bg-secondary/10 text-secondary ring-secondary/20"
  }

  if (lowerType.includes("bài đọc") || lowerType.includes("reading")) {
    return "bg-primary/10 text-primary ring-primary/20"
  }

  if (lowerType.includes("workshop")) {
    return "bg-success/10 text-success ring-success/20"
  }

  if (lowerType.includes("bài tập") || lowerType.includes("exercise")) {
    return "bg-tertiary/10 text-tertiary ring-tertiary/20"
  }

  return "bg-muted text-muted-foreground ring-border/80"
}

function MetricCard({
  icon: Icon,
  label,
  value,
  helper,
  tone = "default",
}: {
  icon: typeof BookOpenCheck
  label: string
  value: string
  helper: string
  tone?: "default" | "info" | "success" | "warning"
}) {
  return (
    <div className="rounded border border-border/80 bg-card p-4 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
            {label}
          </p>
          <p className="mt-2 text-2xl leading-8 font-semibold text-foreground">
            {value}
          </p>
        </div>
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded",
            tone === "default" && "bg-primary/10 text-primary",
            tone === "info" && "bg-secondary/10 text-secondary",
            tone === "success" && "bg-success/10 text-success",
            tone === "warning" && "bg-tertiary/10 text-tertiary"
          )}
        >
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{helper}</p>
    </div>
  )
}
