"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { BookOpenCheck } from "lucide-react"
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
    accessorKey: "code",
    header: "Mã khóa",
    cell: ({ row }) => (
      <span className="font-medium text-foreground">
        {row.original.code}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Khóa học",
    cell: ({ row }) => (
      <span className="block max-w-96 truncate font-semibold text-foreground">
        {row.original.name}
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
    header: "Tiến độ",
    cell: ({ row }) => {
      const completed = row.original.completedLessons
      const total = row.original.lessonCount
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0

      return (
        <div className="min-w-40 space-y-1.5 py-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-foreground">{percent}%</span>
            <span className="text-muted-foreground">
              {completed}/{total} bài học
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted/80 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: () => <span className="block text-right">Thao tác</span>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button type="button" variant="outline" size="sm" asChild>
          <Link href={`/courses/${row.original.code}/learn`}>
            <BookOpenCheck className="size-3.5" />
            Vào học
          </Link>
        </Button>
      </div>
    ),
  },
]

const DEFAULT_PAGINATION: Pagination = {
  limit: 10,
  currentPage: 1,
  nextPage: 0,
  previousPage: 0,
  totalRecords: 0,
  totalPages: 0,
}

export function ClassCoursesTable({
  courses,
  pagination = DEFAULT_PAGINATION,
  isLoading = false,
}: ClassCoursesTableProps) {
  const [, setParams] = useQueryStates(classDetailSearchParams, {
    shallow: true,
  })

  return (
    <DataTable
      columns={columns}
      rows={courses}
      pagination={pagination}
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
