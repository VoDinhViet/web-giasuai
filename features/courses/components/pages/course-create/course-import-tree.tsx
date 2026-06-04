import { BookOpen, FileSpreadsheet, Layers3 } from "lucide-react"

import { formatNumber } from "@/lib/number.util"

import { ImportStatusBadge } from "./import-status-badge"
import type { ChapterImportRow, CourseImportRow, LessonImportRow } from "./types"

export function CourseImportTree({
  courses,
  chapters,
  lessons,
}: {
  courses: CourseImportRow[]
  chapters: ChapterImportRow[]
  lessons: LessonImportRow[]
}) {
  return (
    <div className="grid gap-4">
      {courses.map((course) => {
        const courseChapters = chapters
          .filter((chapter) => chapter.courseCode === course.courseCode)
          .sort(
            (firstChapter, secondChapter) =>
              firstChapter.order - secondChapter.order
          )

        return (
          <div
            key={course.courseCode}
            className="overflow-hidden rounded border border-border bg-muted/45 shadow-xs"
          >
            <div className="flex flex-col gap-3 border-b border-border bg-card p-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground ring-1 ring-border">
                    Dòng {course.rowNumber}
                  </span>
                  <span className="rounded bg-background px-2 py-0.5 text-xs font-bold text-foreground ring-1 ring-border">
                    {course.courseCode}
                  </span>
                  <ImportStatusBadge status={course.status} />
                </div>
                <div className="mt-3 flex items-start gap-3">
                  <FileSpreadsheet className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="font-bold text-foreground">
                      {course.courseName}
                    </p>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">
                      {course.category} · {course.note}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm sm:w-52">
                <TreeCount label="Chương" value={courseChapters.length} />
                <TreeCount
                  label="Bài học"
                  value={courseChapters.reduce(
                    (total, chapter) =>
                      total +
                      lessons.filter(
                        (lesson) => lesson.chapterCode === chapter.chapterCode
                      ).length,
                    0
                  )}
                />
              </div>
            </div>

            {courseChapters.length > 0 ? (
              <div className="grid gap-3 p-4">
                {courseChapters.map((chapter) => (
                  <ChapterTreeNode
                    key={chapter.chapterCode}
                    chapter={chapter}
                    lessons={lessons.filter(
                      (lesson) => lesson.chapterCode === chapter.chapterCode
                    )}
                  />
                ))}
              </div>
            ) : (
              <div className="p-4 text-sm text-muted-foreground">
                Chưa có chương nào được ghép với khóa học này.
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function ChapterTreeNode({
  chapter,
  lessons,
}: {
  chapter: ChapterImportRow
  lessons: LessonImportRow[]
}) {
  return (
    <div className="overflow-hidden rounded border border-border bg-card shadow-xs">
      <div className="flex flex-col gap-3 border-b border-border bg-muted/40 p-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <Layers3 className="mt-0.5 size-4 shrink-0 text-primary" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-bold text-foreground">
                {chapter.chapterTitle}
              </p>
              <span className="rounded bg-card px-2 py-0.5 text-xs font-semibold text-muted-foreground ring-1 ring-border/70">
                {chapter.chapterCode}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              Thứ tự {chapter.order} · Dòng {chapter.rowNumber} · {chapter.note}
            </p>
          </div>
        </div>
        <ImportStatusBadge status={chapter.status} />
      </div>

      <div className="grid gap-2 p-3">
        {lessons.length > 0 ? (
          lessons.map((lesson) => (
            <LessonTreeNode
              key={`${lesson.chapterCode}-${lesson.rowNumber}`}
              lesson={lesson}
            />
          ))
        ) : (
          <p className="rounded bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
            Chương này chưa có bài học.
          </p>
        )}
      </div>
    </div>
  )
}

function LessonTreeNode({ lesson }: { lesson: LessonImportRow }) {
  return (
    <div className="grid gap-3 rounded border border-border/70 bg-background px-3 py-3 sm:grid-cols-[minmax(0,1fr)_8rem_7rem_6rem] sm:items-center">
      <div className="flex min-w-0 items-start gap-3">
        <BookOpen className="mt-0.5 size-4 shrink-0 text-primary" />
        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground">
            {lesson.lessonTitle}
          </p>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            Dòng {lesson.rowNumber} · {lesson.lessonCode || "Thiếu mã bài"} ·{" "}
            {lesson.note}
          </p>
        </div>
      </div>
      <span className="text-sm font-medium text-muted-foreground">
        {lesson.lessonType}
      </span>
      <span className="text-sm font-medium text-muted-foreground">
        {lesson.duration}
      </span>
      <ImportStatusBadge status={lesson.status} />
    </div>
  )
}

function TreeCount({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded border border-border bg-muted/35 px-3 py-2">
      <p className="text-base font-bold text-foreground">
        {formatNumber(value)}
      </p>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
    </div>
  )
}
