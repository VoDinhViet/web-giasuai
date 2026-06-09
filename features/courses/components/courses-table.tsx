"use client"

import { useTransition } from "react"
import { useQueryStates } from "nuqs"

import { DataTable } from "@/components/shared/data-table"
import { Card } from "@/components/ui/card"
import type { Pagination } from "@/types/api"
import { coursesSearchParams } from "../lib/search-params"
import type { CourseListItem } from "../types"
import { createCoursesTableColumns } from "./courses-table-columns"
import { CoursesTableFilter } from "./courses-table-filter"

type CoursesTableProps = {
  courses: CourseListItem[]
  pagination: Pagination
}

export function CoursesTable({ courses, pagination }: CoursesTableProps) {
  const [isPending, startTransition] = useTransition()
  const [params, setParams] = useQueryStates(coursesSearchParams, {
    shallow: false,
    startTransition,
  })
  const columns = createCoursesTableColumns()

  return (
    <Card className="min-w-0 gap-0 py-0" aria-busy={isPending}>
      <CoursesTableFilter
        filters={params}
        isLoading={isPending}
        onFiltersChange={(filters) => setParams({ ...filters, page: 1 })}
      />
      <DataTable
        columns={columns}
        rows={courses}
        pagination={pagination}
        isLoading={isPending}
        rowLabel="khóa học"
        tableClassName="min-w-250"
        onPageChange={(page) => setParams({ page })}
        onPageSizeChange={(limit) => setParams({ limit, page: 1 })}
      />
    </Card>
  )
}
