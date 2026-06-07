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
import type { Class } from "../types"
import { createClassesTableColumns } from "./classes-table-columns"
import { ClassesTablePagination } from "./classes-table-pagination"

type ClassesTableProps = {
  classes: Class[]
  isPending: boolean
  pagination: Pagination
  startTransition: TransitionStartFunction
}

export function ClassesTable({
  classes,
  isPending,
  pagination,
  startTransition,
}: ClassesTableProps) {
  const classColumns = createClassesTableColumns()
  const classTable = useReactTable({
    data: classes,
    columns: classColumns,
    getCoreRowModel: getCoreRowModel(),
  })
  const visibleColumnCount = classTable.getVisibleLeafColumns().length

  return (
    <>
      <Table className="min-w-180">
        <TableHeader className="bg-muted/20">
          {classTable.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-border/60 hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "h-11 border-r border-border/60 px-3 text-xs leading-4 font-bold text-foreground last:border-r-0",
                    getClassColumnWidthClassName(header.column.id),
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
        <TableBody className={cn(isPending && "opacity-50")}>
          {classTable.getRowModel().rows.length ? (
            classTable.getRowModel().rows.map((tableRow) => (
              <TableRow
                key={tableRow.id}
                className="h-14 border-border/45 hover:bg-primary/5"
              >
                {tableRow.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "border-r border-border/50 px-3 py-2 last:border-r-0",
                      getClassColumnWidthClassName(cell.column.id),
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
                      Không tìm thấy lớp học nào khớp với bộ lọc hiện tại.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ClassesTablePagination
        pagination={pagination}
        isPending={isPending}
        startTransition={startTransition}
      />
    </>
  )
}

function getClassColumnWidthClassName(columnId: string) {
  switch (columnId) {
    case "code":
      return "w-32"
    case "name":
      return "w-72"
    case "instructor":
      return "w-48"
    case "studentCount":
      return "w-28"
    case "repeatDays":
      return "w-44"
    case "startDate":
      return "w-44"
    case "status":
      return "w-32"
    case "actions":
      return "w-34"
    default:
      return undefined
  }
}
