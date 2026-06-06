"use client"

import type { TransitionStartFunction } from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { SearchX } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { Pagination } from "@/types/api"
import type { User } from "../types"
import { createUserTableColumns } from "./users-table-columns"
import { UsersTablePagination } from "./users-table-pagination"

type UsersTableProps = {
  isPending: boolean
  users: User[]
  pagination: Pagination
  startTransition: TransitionStartFunction
}

export function UsersTable({
  isPending,
  pagination,
  startTransition,
  users,
}: UsersTableProps) {
  const userColumns = createUserTableColumns()
  const userTable = useReactTable({
    data: users,
    columns: userColumns,
    getCoreRowModel: getCoreRowModel(),
  })
  const visibleColumnCount = userTable.getVisibleLeafColumns().length

  return (
    <>
      <Table className="min-w-240">
        <TableHeader className="bg-muted/20">
          {userTable.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-border/60 hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "h-11 border-r border-border/60 px-3 text-xs leading-4 font-bold text-foreground last:border-r-0",
                    getUserColumnWidthClassName(header.column.id),
                    header.column.id === "actions" && "text-right"
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {userTable.getRowModel().rows.length ? (
            userTable.getRowModel().rows.map((tableRow) => (
              <TableRow
                key={tableRow.id}
                className="h-14 border-border/45 hover:bg-primary/5"
              >
                {tableRow.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "border-r border-border/50 px-3 py-2 last:border-r-0",
                      getUserColumnWidthClassName(cell.column.id),
                      cell.column.id === "actions" && "text-right"
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={visibleColumnCount}
                className="p-0 whitespace-normal"
              >
                <Empty className="py-12">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <SearchX className="size-5" />
                    </EmptyMedia>
                    <EmptyTitle>Không có dữ liệu</EmptyTitle>
                    <EmptyDescription>
                      Không tìm thấy người dùng nào khớp với bộ lọc hiện tại.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <UsersTablePagination
        pagination={pagination}
        isPending={isPending}
        startTransition={startTransition}
      />
    </>
  )
}

function getUserColumnWidthClassName(columnId: string) {
  switch (columnId) {
    case "username":
      return "w-44"
    case "fullName":
      return "w-56"
    case "role":
      return "w-40"
    case "email":
      return "w-64"
    case "isLocked":
      return "w-36"
    case "actions":
      return "w-30"
    default:
      return undefined
  }
}
