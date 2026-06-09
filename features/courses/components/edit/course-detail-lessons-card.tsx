import Link from "next/link"
import { BrainCircuit, Clock3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Lesson } from "@/features/lessons/types"

type CourseDetailLessonsCardProps = {
  courseCode: string
  lessons: Lesson[]
}

type Chapter = {
  code: string
  title: string
  lessons: Lesson[]
}

export function CourseDetailLessonsCard({
  courseCode,
  lessons,
}: CourseDetailLessonsCardProps) {
  const chapters = createChapters(lessons, courseCode)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-border/70 bg-muted/25">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>Bài học trong khóa</CardTitle>
            <CardDescription className="mt-2">
              Mỗi bài học có luồng biên soạn riêng cho lý thuyết, mô phỏng và
              bài tập.
            </CardDescription>
          </div>
          <span className="w-fit rounded bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border">
            {chapters.length} chương · {lessons.length} bài
          </span>
        </div>
      </CardHeader>
      <CardContent className="bg-background/70 p-4">
        <div className="grid gap-3">
          {chapters.map((chapter, index) => (
            <ChapterSection
              key={chapter.code}
              chapter={chapter}
              index={index}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function createChapters(
  lessons: Lesson[],
  courseCode: string
): Chapter[] {
  const midpoint = Math.max(1, Math.ceil(lessons.length / 2))
  const lessonGroups = [
    lessons.slice(0, midpoint),
    lessons.slice(midpoint),
  ].filter((lessonGroup) => lessonGroup.length > 0)

  return lessonGroups.map((lessonGroup, index) => ({
    code: `${courseCode}-C${index + 1}`,
    title:
      index === 0 ? "Chương 1: Nền tảng" : "Chương 2: Luyện tập và ứng dụng",
    lessons: lessonGroup,
  }))
}

function ChapterSection({
  chapter,
  index,
}: {
  chapter: Chapter
  index: number
}) {
  return (
    <div className="overflow-hidden rounded border border-border/80 bg-card shadow-xs">
      <div className="border-b border-border/70 bg-muted/35 px-4 py-4">
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
      </div>

      <div className="grid h-auto gap-2 bg-muted/20 p-3 pb-3">
        {chapter.lessons.map((lesson, lessonIndex) => (
          <LessonRow
            key={lesson.code}
            lesson={lesson}
            index={lessonIndex}
          />
        ))}
      </div>
    </div>
  )
}

function LessonRow({
  lesson,
  index,
}: {
  lesson: Lesson
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
          {lesson.code} · {lesson.resourceCount} học liệu
        </p>
      </div>
      <span
        className={cn(
          "rounded px-2.5 py-1 text-xs font-semibold ring-1",
          getLessonTypeClassName(lesson.type)
        )}
      >
        {getLessonTypeLabel(lesson.type)}
      </span>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
        <Clock3 className="size-3.5" />
        {formatDurationMinutes(lesson.durationMinutes)}
      </span>
      <Button type="button" variant="outline" size="sm" asChild>
        <Link
          href={{
            pathname: `/manage/lessons/${lesson.id}/edit`,
          }}
          className="justify-self-start lg:justify-self-end"
        >
          <BrainCircuit className="size-4" />
          Biên soạn
        </Link>
      </Button>
    </div>
  )
}

function formatDurationMinutes(durationMinutes: number) {
  if (durationMinutes >= 60 && durationMinutes % 60 === 0) {
    return `${durationMinutes / 60} giờ`
  }
  return `${durationMinutes} phút`
}

function getLessonTypeLabel(type: string) {
  const map: Record<string, string> = {
    VIDEO: "Video",
    READING: "Bài đọc",
    EXERCISE: "Bài tập",
    WORKSHOP: "Workshop",
    QUIZ: "Quiz",
    RESOURCE: "Tài liệu",
  }
  return map[type.toUpperCase()] ?? type
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

  if (
    lowerType.includes("bài tập") ||
    lowerType.includes("exercise") ||
    lowerType.includes("quiz")
  ) {
    return "bg-tertiary/10 text-tertiary ring-tertiary/20"
  }

  return "bg-muted text-muted-foreground ring-border/80"
}
