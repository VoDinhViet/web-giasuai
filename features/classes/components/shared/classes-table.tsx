"use client"

import { useTransition } from "react"
import { useQueryStates } from "nuqs"

import { DataTable } from "@/components/shared/data-table"
import { Card } from "@/components/ui/card"
import type { Pagination } from "@/types/api"
import { classesSearchParams } from "../../lib/search-params"
import type { Class } from "../../types"
import { createClassesTableColumns } from "./classes-table-columns"
import { ClassesTableFilter } from "./classes-table-filter"

type ClassesTableProps = {
  classes: Class[]
  pagination: Pagination
}

export function ClassesTable({ classes, pagination }: ClassesTableProps) {
  const [isPending, startTransition] = useTransition()
  const [params, setParams] = useQueryStates(classesSearchParams, {
    shallow: false,
    startTransition,
  })
  const columns = createClassesTableColumns()

  return (
    <Card className="min-w-0 gap-0 py-0" aria-busy={isPending}>
      <ClassesTableFilter
        filters={params}
        isLoading={isPending}
        onFiltersChange={(filters) => setParams({ ...filters, page: 1 })}
      />
      <DataTable
        columns={columns}
        rows={classes}
        pagination={pagination}
        isLoading={isPending}
        rowLabel="lớp học"
        tableClassName="min-w-200"
        onPageChange={(page) => setParams({ page })}
        onPageSizeChange={(limit) => setParams({ limit, page: 1 })}
      />
    </Card>
  )
}
