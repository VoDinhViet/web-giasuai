"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { useQueryStates } from "nuqs"
import Link from "next/link"
import { DateTime } from "luxon"

import { DataTable } from "@/components/shared/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/features/users/types"
import type { Pagination } from "@/types/api"
import { classDetailSearchParams } from "../../lib/search-params"

type ClassLearnersTableProps = {
  learners: User[]
  pagination?: Pagination
  isLoading?: boolean
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "fullName",
    header: "Học viên",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-9 border border-border/70">
          <AvatarImage
            src={row.original.profile?.avatarUrl ?? undefined}
            alt={row.original.fullName}
          />
          <AvatarFallback className="font-semibold">
            {row.original.fullName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <Link
            href={`/manage/users/${row.original.id}`}
            className="font-semibold text-foreground hover:text-primary hover:underline"
          >
            {row.original.fullName}
          </Link>
          <p className="text-xs text-muted-foreground mt-0.5">
            {row.original.username}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Liên hệ",
    cell: ({ row }) => (
      <div className="text-sm">
        <a
          href={`mailto:${row.original.email}`}
          className="block font-medium text-foreground hover:text-primary hover:underline truncate max-w-56"
        >
          {row.original.email}
        </a>
        <p className="text-xs text-muted-foreground mt-0.5">
          {row.original.profile?.phone ?? "Chưa cập nhật SĐT"}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tham gia",
    cell: ({ row }) => (
      <span className="text-sm text-foreground">
        {DateTime.fromISO(row.original.createdAt).toFormat("dd/MM/yyyy")}
      </span>
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
          <Link href={`/manage/users/${row.original.id}`}>
            Chi tiết
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

export function ClassLearnersTable({
  learners,
  pagination = DEFAULT_PAGINATION,
  isLoading = false,
}: ClassLearnersTableProps) {
  const [, setParams] = useQueryStates(classDetailSearchParams, {
    shallow: true,
  })

  return (
    <DataTable
      columns={columns}
      rows={learners}
      pagination={pagination}
      isLoading={isLoading}
      rowLabel="học viên"
      tableClassName="min-w-160"
      onPageChange={(learnerPage) => setParams({ learnerPage })}
      onPageSizeChange={(learnerPageSize) =>
        setParams({ learnerPageSize, learnerPage: 1 })
      }
    />
  )
}
