"use client"

import Link from "next/link"
import { Plus } from "lucide-react"

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

              return (
                <div className="rounded border border-border/70 bg-muted/30 p-3">
                  <p className="text-xs font-semibold text-muted-foreground">
                    Khóa được chọn
                  </p>
                  <p className="mt-1 text-sm leading-5 font-semibold break-words text-foreground">
                    {selectedCourse
                      ? `${selectedCourse.code} - ${selectedCourse.name}`
                      : "Chưa chọn khóa học"}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {selectedCourse
                      ? `${selectedCourse.category} - ${selectedCourse.lessonCount} bài học`
                      : "Chọn một khóa ở danh sách bên trái để tiếp tục."}
                  </p>
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
                className="w-full"
                disabled={
                  !canSubmit ||
                  isSubmitting ||
                  unassignedCourses.length === 0
                }
              >
                <Plus />
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
