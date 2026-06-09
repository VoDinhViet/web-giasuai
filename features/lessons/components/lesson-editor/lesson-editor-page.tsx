import Link from "next/link"
import {
  ArrowLeft,
  Eye,
  FileQuestion,
  Layers3,
  PlaySquare,
  Save,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Course } from "@/features/courses/types"
import type { Lesson } from "@/features/lessons/types"
import { LessonEditorExerciseTab } from "./lesson-editor-exercise-tab"
import { LessonEditorSimulationTab } from "./lesson-editor-simulation-tab"
import { LessonEditorTheoryTab } from "./lesson-editor-theory-tab"

type LessonEditorPageProps = {
  course: Course
  courseId: string
  lesson: Lesson
}

export function LessonEditorPage({
  course,
  courseId,
  lesson,
}: LessonEditorPageProps) {
  return (
    <div className="grid gap-5">
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="-ml-2"
                asChild
              >
                <Link href={{ pathname: `/manage/courses/${courseId}` }}>
                  <ArrowLeft className="size-4" />
                  Cấu trúc khóa học
                </Link>
              </Button>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary">
                  {course.code}
                </span>
                <span className="rounded border border-border bg-card px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  {lesson.code}
                </span>
              </div>

              <CardTitle className="mt-3 max-w-4xl text-2xl leading-8 font-bold tracking-normal">
                {lesson.title}
              </CardTitle>
              <CardDescription className="mt-2 max-w-3xl text-sm leading-6">
                {course.name}
              </CardDescription>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
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
        </CardHeader>
      </Card>

      <Tabs defaultValue="theory" className="grid gap-4">
        <TabsList className="grid h-auto w-full grid-cols-3">
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

        <TabsContent value="theory" className="mt-0">
          <LessonEditorTheoryTab
            lessonId={lesson.id}
            parts={lesson.parts ?? []}
          />
        </TabsContent>

        <TabsContent value="simulation" className="mt-0">
          <LessonEditorSimulationTab />
        </TabsContent>

        <TabsContent value="exercise" className="mt-0">
          <LessonEditorExerciseTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
