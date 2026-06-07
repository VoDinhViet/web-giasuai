"use client"

import Link from "next/link"
import { Plus, BookOpen, BookCheck, X } from "lucide-react"

import { withForm } from "@/components/form/app-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { AssignClassCourseInput } from "../../schemas/class.schema"
import type { UnassignedClassCourse } from "../../types"

const assignCoursesDefaultValues: AssignClassCourseInput = {
  courseId: "",
  required: true,
}

type AssignActionsCardProps = {
  classCode: string
  unassignedCourses: UnassignedClassCourse[]
}

const assignActionsDefaultProps: AssignActionsCardProps = {
  classCode: "",
  unassignedCourses: [],
}

export const AssignActionsCard = withForm({
  defaultValues: assignCoursesDefaultValues,
  props: assignActionsDefaultProps,
  render: function RenderAssignActionsCard({
    form,
    classCode,
    unassignedCourses,
  }) {
    return (
      <Card className="gap-0 py-0">
        <CardHeader className="border-b border-border/70 p-5">
          <CardTitle>Thao tác</CardTitle>
          <CardDescription>Kiểm tra lựa chọn trước khi gán.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 p-5">
          <form.Subscribe selector={(state) => state.values}>
            {(values) => {
              const selectedCourse = unassignedCourses.find(
                (course) => course.id === values.courseId
              )

              if (!selectedCourse) {
                return (
                  <div className="flex items-start gap-3 rounded-lg border border-dashed border-border/80 bg-muted/10 p-4 transition-all duration-200">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground/60 shadow-xs">
                      <BookOpen className="size-4 animate-pulse text-muted-foreground/80" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Khóa được chọn
                      </p>
                      <p className="mt-1 text-sm font-semibold text-muted-foreground/70">
                        Chưa chọn khóa học
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground/60 leading-relaxed">
                        Chọn một khóa ở danh sách bên trái để tiếp tục.
                      </p>
                    </div>
                  </div>
                )
              }

              return (
                <div className="relative flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 shadow-xs transition-all duration-200">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookCheck className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1 pr-6">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                      Khóa được chọn
                    </p>
                    <p className="mt-1 text-sm font-bold leading-snug text-foreground break-words">
                      {selectedCourse.code} - {selectedCourse.name}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center rounded-md bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border">
                        {selectedCourse.category}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        {selectedCourse.lessonCount} bài học
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => form.setFieldValue("courseId", "")}
                    className="absolute top-2 right-2 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-full"
                    aria-label="Bỏ chọn khóa học"
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>
              )
            }}
          </form.Subscribe>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                className="w-full mt-1"
                disabled={
                  !canSubmit ||
                  isSubmitting ||
                  unassignedCourses.length === 0
                }
              >
                <Plus className="size-4" />
                {isSubmitting ? "Đang gán..." : "Gán khóa học"}
              </Button>
            )}
          </form.Subscribe>
          <Button type="button" variant="outline" className="w-full" asChild>
            <Link href={`/manage/classes/${classCode}`}>
              Hủy thao tác
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  },
})
