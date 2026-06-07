"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { BookOpenCheck } from "lucide-react"
import type { Route } from "next"
import Link from "next/link"
import { useQueryStates } from "nuqs"
import * as React from "react"

import { DataTable } from "@/components/shared/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Pagination } from "@/types/api"
import { classDetailSearchParams } from "../../lib/search-params"
import type { ClassCourse } from "../../types"

type ClassCoursesTableProps = {
  courses: ClassCourse[]
  pagination?: Pagination
  isLoading?: boolean
}

const columns: ColumnDef<ClassCourse>[] = [
  {
    accessorKey: "courseCode",
    header: "Mã khóa",
    cell: ({ row }) => (
      <span className="font-medium text-foreground">
        {row.original.courseCode}
      </span>
    ),
  },
  {
    accessorKey: "courseName",
    header: "Khóa học",
    cell: ({ row }) => (
      <span className="block max-w-96 truncate font-semibold text-foreground">
        {row.original.courseName}
      </span>
    ),
  },
  {
    accessorKey: "required",
    header: "Loại",
    cell: ({ row }) => <CourseTypeBadge required={row.original.required} />,
  },
  {
    accessorKey: "completedLessons",
    header: () => <span className="block text-right">Bài học</span>,
    cell: ({ row }) => (
      <span className="block text-right font-medium text-foreground">
        {row.original.completedLessons}/{row.original.lessonCount}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <span className="block text-right">Thao tác</span>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button type="button" variant="outline" size="sm" asChild>
          <Link href={`/courses/${row.original.courseCode}/learn` as Route}>
            <BookOpenCheck className="size-3.5" />
            Vào học
          </Link>
        </Button>
      </div>
    ),
  },
]

export function ClassCoursesTable({
  courses,
  pagination,
  isLoading = false,
}: ClassCoursesTableProps) {
  const [, setParams] = useQueryStates(classDetailSearchParams, {
    shallow: true,
  })

  return (
    <DataTable
      columns={columns}
      rows={courses}
      pagination={
        pagination ?? {
          limit: 10,
          currentPage: 1,
          nextPage: 0,
          previousPage: 0,
          totalRecords: 0,
          totalPages: 0,
        }
      }
      isLoading={isLoading}
      rowLabel="khóa học"
      tableClassName="min-w-170"
      onPageChange={(coursePage) => setParams({ coursePage })}
      onPageSizeChange={(coursePageSize) =>
        setParams({ coursePageSize, coursePage: 1 })
      }
    />
  )
}

function CourseTypeBadge({ required }: { required: boolean }) {
  if (required) {
    return (
      <Badge
        variant="outline"
        className="border-primary/20 bg-primary/10 text-primary"
      >
        Bắt buộc
      </Badge>
    )
  }

  return <Badge variant="ghost">Bổ trợ</Badge>
}
