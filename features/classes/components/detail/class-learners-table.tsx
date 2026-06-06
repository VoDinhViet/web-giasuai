"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { useQueryStates } from "nuqs"
import { useTransition } from "react"
import type { Route } from "next"
import Link from "next/link"

import { DataTable } from "@/components/shared/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Pagination } from "@/types/api"
import { classDetailSearchParams } from "../../lib/search-params"
import type { ClassLearner } from "../../types"

type ClassLearnersTableProps = {
  learners: ClassLearner[]
  pagination?: Pagination
}

const columns: ColumnDef<ClassLearner>[] = [
  {
    accessorKey: "username",
    header: "Mã HV",
    cell: ({ row }) => (
      <span className="font-medium text-foreground">
        {row.original.username}
      </span>
    ),
  },
  {
    accessorKey: "fullName",
    header: "Học viên",
    cell: ({ row }) => (
      <div className="min-w-0">
        <Link
          href={`/manage/users/${row.original.id}` as Route}
          className="font-medium text-foreground hover:text-primary hover:underline"
        >
          {row.original.fullName}
        </Link>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "isLocked",
    header: "Trạng thái",
    cell: ({ row }) => (
      <Badge
        variant={row.original.isLocked ? "destructive" : "ghost"}
        className={
          row.original.isLocked
            ? "ring-1 ring-destructive/20"
            : "bg-success-container/80 text-success ring-1 ring-success/20"
        }
      >
        {row.original.isLocked ? "Đã khóa" : "Đang hoạt động"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: () => <span className="block text-right">Thao tác</span>,
    cell: ({ row }) => (
      <div className="text-right">
        <Button type="button" variant="outline" size="sm" asChild>
          <Link href={`/manage/users/${row.original.id}` as Route}>Chi tiết</Link>
        </Button>
      </div>
    ),
  },
]

export function ClassLearnersTable({
  learners,
  pagination,
}: ClassLearnersTableProps) {
  const [isPending, startTransition] = useTransition()
  const [, setParams] = useQueryStates(classDetailSearchParams, {
    shallow: false,
    startTransition,
  })

  return (
    <DataTable
      columns={columns}
      rows={learners}
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
      isLoading={isPending}
      rowLabel="học viên"
      tableClassName="min-w-160"
      onPageChange={(learnerPage) => setParams({ learnerPage })}
      onPageSizeChange={(learnerPageSize) =>
        setParams({ learnerPageSize, learnerPage: 1 })
      }
    />
  )
}
