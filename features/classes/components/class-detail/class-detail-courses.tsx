"use client"

import { BookOpenCheck } from "lucide-react"
import { useQueryStates } from "nuqs"
import useSWR from "swr"

import type { PaginatedResponse } from "@/types/api"
import { classDetailSearchParams } from "../../lib/search-params"
import { getClassCourses } from "../../actions/get-class-courses"
import type { ClassCourse } from "../../types"
import { ClassCoursesTable } from "./class-courses-table"

type ClassDetailCoursesProps = {
  classCode: string
}

export function ClassDetailCourses({
  classCode,
}: ClassDetailCoursesProps) {
  const [params] = useQueryStates(classDetailSearchParams)

  const swrKey = ["class-courses", classCode, params.coursePage, params.coursePageSize, params.courseQ]

  const { data, isLoading, isValidating } = useSWR<PaginatedResponse<ClassCourse>>(
    swrKey,
    async () => {
      return getClassCourses(classCode, {
        page: params.coursePage,
        limit: params.coursePageSize,
        q: params.courseQ || undefined,
      })
    },
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  )

  const courses = data?.data ?? []
  const pagination = data?.pagination
  const isFetching = isLoading || isValidating

  return (
    <section className="rounded border border-border/80 bg-card shadow-xs">
      <div className="border-b border-border/70 p-4">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
            <BookOpenCheck className="size-4" />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-foreground">
              Khóa học trong lớp
            </h2>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              Quản lý các khóa học và học liệu được thêm vào lớp.
            </p>
          </div>
        </div>
      </div>
      <ClassCoursesTable
        courses={courses}
        pagination={pagination}
        isLoading={isFetching}
      />
    </section>
  )
}
