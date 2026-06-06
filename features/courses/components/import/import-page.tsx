"use client"

import type { Route } from "next"
import { useRouter } from "next/navigation"
import { useMemo, useState, useTransition } from "react"
import {
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Layers3,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { createCourse } from "@/features/courses/actions/create-course"
import { getCourseImportTemplate } from "@/features/courses/actions/get-course-import-template"
import { parseCourseImportFile } from "@/features/courses/actions/parse-course-import-file"
import type { CreateCourseInput } from "@/features/courses/schemas/course-form.schema"
import type { CourseImportPreview } from "@/features/courses/types"
import { formatNumber } from "@/lib/number.util"

import { courseImportToneClassName } from "./import-data"
import { CourseImportEmptyState } from "./empty-state"
import { CourseImportTree } from "./tree"
import { ImportFileCard } from "./file-card"
import { ImportSaveSummaryCard } from "./save-summary-card"
import { ImportStatusSummary } from "./status-summary"
import { ReviewMetric } from "./review-metric"
import { SectionTitle } from "./section-title"
import { TemplateStructureCard } from "./template-structure-card"
import type { CourseImportTemplateFile } from "./types"

type CourseImportLessonType = NonNullable<
  NonNullable<CreateCourseInput["lessons"]>[number]["lessonType"]
>

function downloadTemplateFile({
  contentBase64,
  contentType,
  filename,
}: CourseImportTemplateFile) {
  const byteCharacters = atob(contentBase64)
  const byteNumbers = Array.from(byteCharacters, (character) =>
    character.charCodeAt(0)
  )
  const blob = new Blob([new Uint8Array(byteNumbers)], { type: contentType })
  const objectUrl = URL.createObjectURL(blob)
  const anchor = document.createElement("a")

  anchor.href = objectUrl
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(objectUrl)
}

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
    const courseLessons = importPreview.lessons.filter((lesson) =>
      chapterCodes.has(lesson.chapterCode)
    )
    const durationMinutes = courseLessons.reduce(
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
      lessons: courseLessons.map((lesson, index) => ({
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

export function CourseImportPage() {
  const router = useRouter()
  const [fileName, setFileName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [importPreview, setImportPreview] = useState<CourseImportPreview>({
    courses: [],
    chapters: [],
    lessons: [],
  })
  const [templateErrorMessage, setTemplateErrorMessage] = useState("")
  const [saveMessage, setSaveMessage] = useState("")
  const [isDownloadingTemplate, startTemplateDownloadTransition] =
    useTransition()
  const [isReadingFile, startReadFileTransition] = useTransition()
  const [isSaving, startSaveTransition] = useTransition()

  const invalidRowCount = useMemo(
    () =>
      importPreview.chapters.filter((row) => row.status === "Lỗi").length +
      importPreview.lessons.filter((row) => row.status === "Lỗi").length,
    [importPreview]
  )
  const warningRowCount = importPreview.courses.filter(
    (row) => row.status === "Cảnh báo"
  ).length
  const importedEntityCount =
    importPreview.courses.length +
    importPreview.chapters.length +
    importPreview.lessons.length
  const hasImportData = importedEntityCount > 0

  function handleDownloadTemplate() {
    setTemplateErrorMessage("")

    startTemplateDownloadTransition(async () => {
      const response = await getCourseImportTemplate()

      if (!response.success || !response.data) {
        setTemplateErrorMessage(
          response.message || "Không thể tải file mẫu tạo khóa học."
        )
        return
      }

      downloadTemplateFile(response.data)
    })
  }

  function handleFileChange(file: File) {
    setSelectedFile(file)
    setFileName(file.name)
    setTemplateErrorMessage("")
    setSaveMessage("")
    readImportFile(file)
  }

  function handleReadFile() {
    setTemplateErrorMessage("")

    if (!selectedFile) {
      setTemplateErrorMessage("Vui lòng chọn file Excel trước khi đọc lại.")
      return
    }

    readImportFile(selectedFile)
  }

  function readImportFile(file: File) {
    startReadFileTransition(async () => {
      const formData = new FormData()
      formData.append("file", file)
      const response = await parseCourseImportFile(formData)

      if (!response.success || !response.data) {
        setTemplateErrorMessage(response.message || "Không thể đọc file Excel.")
        return
      }

      setImportPreview(response.data)
      setSaveMessage("")
    })
  }

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
          router.push(`/manage/courses?q=${firstCreatedCourse.code}` as Route)
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
    <div className={`grid gap-5 ${courseImportToneClassName}`}>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <ReviewMetric
          icon={FileSpreadsheet}
          label="Tổng dòng"
          value={formatNumber(importedEntityCount)}
          helper="Khóa + chương + bài"
          tone="default"
        />
        <ReviewMetric
          icon={CheckCircle2}
          label="Khóa học"
          value={formatNumber(importPreview.courses.length)}
          helper="Dòng khóa học"
          tone="success"
        />
        <ReviewMetric
          icon={AlertTriangle}
          label="Cảnh báo"
          value={formatNumber(warningRowCount)}
          helper="Có thể lưu sau khi xác nhận"
          tone="warning"
        />
        <ReviewMetric
          icon={AlertTriangle}
          label="Lỗi"
          value={formatNumber(invalidRowCount)}
          helper="Cần sửa trước khi lưu"
          tone="danger"
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <ImportFileCard
          fileName={fileName}
          isDownloadingTemplate={isDownloadingTemplate}
          isReadingFile={isReadingFile}
          templateErrorMessage={templateErrorMessage}
          onDownloadTemplate={handleDownloadTemplate}
          onFileChange={handleFileChange}
          onReadFile={handleReadFile}
        />
        <TemplateStructureCard />
      </section>

      <Card data-tone="info">
        <CardHeader>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <SectionTitle
                icon={Layers3}
                title="Xem trước cây khóa học trước khi tạo"
              />
              <CardDescription>
                Kiểm tra quan hệ khóa học, chương và bài học theo dạng cây trước
                khi tạo khóa học trong hệ thống.
              </CardDescription>
            </div>
            <ImportStatusSummary
              invalidRowCount={invalidRowCount}
              warningRowCount={warningRowCount}
            />
          </div>
        </CardHeader>
        <CardContent>
          {hasImportData ? (
            <CourseImportTree
              courses={importPreview.courses}
              chapters={importPreview.chapters}
              lessons={importPreview.lessons}
            />
          ) : (
            <CourseImportEmptyState />
          )}
        </CardContent>
      </Card>

      <ImportSaveSummaryCard
        hasImportData={hasImportData}
        invalidRowCount={invalidRowCount}
        isSaving={isSaving}
        saveMessage={saveMessage}
        onSave={handleSaveCourses}
      />
    </div>
  )
}
