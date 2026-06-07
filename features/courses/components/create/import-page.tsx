"use client"

import { useState } from "react"
import { Layers3 } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import type { CourseImportPreview } from "@/features/courses/types"

import { CourseImportEmptyState } from "./empty-state"
import { CourseImportTree } from "./tree"
import { ImportFileCard } from "./file-card"
import { ImportSaveSummaryCard } from "./save-summary-card"
import { ImportStatusSummary } from "./status-summary"
import { SectionTitle } from "./section-title"
import { TemplateStructureCard } from "./template-structure-card"

export function CreateCoursePage() {
  const [importPreview, setImportPreview] = useState<CourseImportPreview>({
    courses: [],
    chapters: [],
    lessons: [],
  })

  const hasImportData =
    importPreview.courses.length +
      importPreview.chapters.length +
      importPreview.lessons.length >
    0

  return (
    <div className="flex w-full flex-col gap-5">
      <section className="grid gap-5 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_24rem] items-start">
        <ImportFileCard onPreviewChange={setImportPreview} />
        <TemplateStructureCard />
      </section>

      <Card>
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
            <ImportStatusSummary importPreview={importPreview} />
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

      <ImportSaveSummaryCard importPreview={importPreview} />
    </div>
  )
}
