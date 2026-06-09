"use client"

import { useMemo, useState, useTransition } from "react"
import { AlertCircle, AlertTriangle, CheckCircle2, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createCourse } from "@/features/courses/actions/create-course"
import type { CreateCourseInput } from "@/features/courses/schemas/course-form.schema"
import type { CourseImportPreview } from "@/features/courses/types"

type CourseImportLessonType = NonNullable<
  NonNullable<CreateCourseInput["lessons"]>[number]["lessonType"]
>

function getImportedLessonDurationMinutes(duration: string) {
  const durationMatch = duration.match(/\d+/)

  return durationMatch ? Number(durationMatch[0]) : 0
}

function getImportedLessonType(lessonType: string): CourseImportLessonType {
  const lowerLessonType = lessonType.toLowerCase()

  if (lowerLessonType.includes("quiz")) return "QUIZ"
  if (
    lowerLessonType.includes("bài tập") ||
    lowerLessonType.includes("exercise")
  ) {
    return "EXERCISE"
  }
  if (lowerLessonType.includes("workshop")) return "WORKSHOP"
  if (lowerLessonType.includes("video")) return "VIDEO"
  if (lowerLessonType.includes("đọc") || lowerLessonType.includes("reading")) {
    return "READING"
  }

  return "RESOURCE"
}

function createCourseInputsFromImportPreview(
  importPreview: CourseImportPreview
): CreateCourseInput[] {
  return importPreview.courses.map((course) => {
    const courseChapters = importPreview.chapters
      .filter((chapter) => chapter.courseCode === course.courseCode)
      .sort(
        (firstChapter, secondChapter) =>
          firstChapter.order - secondChapter.order
      )
    const chapterCodes = new Set(
      courseChapters.map((chapter) => chapter.chapterCode)
    )
    const lessons = importPreview.lessons.filter((lesson) =>
      chapterCodes.has(lesson.chapterCode)
    )
    const durationMinutes = lessons.reduce(
      (total, lesson) =>
        total + getImportedLessonDurationMinutes(lesson.duration),
      0
    )

    return {
      code: course.courseCode,
      name: course.courseName,
      category: course.category,
      description: course.note,
      level: "ALL_LEVELS",
      durationMinutes,
      status: "DRAFT",
      chapters: courseChapters.map((chapter) => ({
        chapterCode: chapter.chapterCode,
        chapterTitle: chapter.chapterTitle,
        order: chapter.order,
      })),
      lessons: lessons.map((lesson, index) => ({
        chapterCode: lesson.chapterCode,
        lessonCode: lesson.lessonCode,
        lessonTitle: lesson.lessonTitle,
        lessonType: getImportedLessonType(lesson.lessonType),
        durationMinutes: getImportedLessonDurationMinutes(lesson.duration),
        status: "DRAFT",
        resourceCount: 0,
        position: index + 1,
      })),
    }
  })
}

export function ImportSaveSummaryCard({
  importPreview,
}: {
  importPreview: CourseImportPreview
}) {
  const router = useRouter()
  const [saveMessage, setSaveMessage] = useState("")
  const [isSaving, startSaveTransition] = useTransition()

  const importedEntityCount =
    importPreview.courses.length +
    importPreview.chapters.length +
    importPreview.lessons.length
  const hasImportData = importedEntityCount > 0

  const invalidRowCount = useMemo(
    () =>
      importPreview.chapters.filter((row) => row.status === "Lỗi").length +
      importPreview.lessons.filter((row) => row.status === "Lỗi").length,
    [importPreview]
  )

  const canSave = hasImportData && invalidRowCount === 0

  function handleSaveCourses() {
    setSaveMessage("")

    if (!hasImportData) {
      setSaveMessage("Vui lòng chọn file Excel trước khi tạo khóa học.")
      return
    }

    if (invalidRowCount > 0) {
      setSaveMessage("Cần sửa lỗi trong file Excel trước khi tạo khóa học.")
      return
    }

    const courseInputs = createCourseInputsFromImportPreview(importPreview)

    startSaveTransition(async () => {
      try {
        const createdCourses = []

        for (const courseInput of courseInputs) {
          createdCourses.push(await createCourse(courseInput))
        }

        setSaveMessage(`Đã tạo ${createdCourses.length} khóa học.`)
        const firstCreatedCourse = createdCourses[0]

        if (firstCreatedCourse) {
          router.push(`/manage/courses?q=${firstCreatedCourse.code}`)
        }
      } catch (createCourseError) {
        setSaveMessage(
          createCourseError instanceof Error
            ? createCourseError.message
            : "Không thể tạo khóa học."
        )
      }
    })
  }

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background border text-muted-foreground shadow-xs">
              {!hasImportData ? (
                <AlertCircle className="size-5" />
              ) : invalidRowCount > 0 ? (
                <AlertTriangle className="size-5 text-destructive" />
              ) : (
                <CheckCircle2 className="size-5 text-primary" />
              )}
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-bold text-foreground">
                {!hasImportData
                  ? "Chưa nhận dữ liệu khóa học"
                  : invalidRowCount > 0
                    ? `Phát hiện ${invalidRowCount} lỗi dữ liệu cần khắc phục`
                    : "Dữ liệu cấu trúc đã sẵn sàng"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {!hasImportData
                  ? "Hãy chọn file mẫu, điền cấu trúc và tải file lên để bắt đầu xem trước."
                  : invalidRowCount > 0
                    ? "Sửa các dòng bị lỗi trong file Excel, sau đó click Đọc lại file để rà soát."
                    : "Mọi chương và bài học đã hợp lệ. Nhấn Tạo khóa học để ghi nhận vào hệ thống."}
              </p>
              {saveMessage ? (
                <div className="mt-2 text-xs font-semibold text-foreground">
                  {saveMessage}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end shrink-0">
            <Button asChild type="button" variant="outline">
              <Link href="/manage/courses">Hủy</Link>
            </Button>
            <Button
              type="button"
              disabled={!canSave || isSaving}
              onClick={handleSaveCourses}
              className="gap-2"
            >
              <Save className="size-4" />
              {isSaving ? "Đang tạo..." : "Tạo khóa học"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
