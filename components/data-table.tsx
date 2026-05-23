"use client"

import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, Ellipsis, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
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

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  rows: TData[]
  pagination: Pagination
  rowLabel: string
  emptyTitle: string
  emptyDescription: string
  onPageChange: (page: number) => void
  toolbar?: React.ReactNode
  tableClassName?: string
}

export function DataTable<TData, TValue>({
  columns,
  rows,
  pagination,
  rowLabel,
  emptyTitle,
  emptyDescription,
  onPageChange,
  toolbar,
  tableClassName,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const totalRows = pagination.totalRecords
  const pageSize = pagination.limit
  const selectedPage = Math.min(
    pagination.currentPage,
    pagination.totalPages || 1
  )
  const pageCount = pagination.totalPages || 1
  const firstRowIndex = (selectedPage - 1) * pageSize
  const lastRowIndex =
    totalRows === 0 ? 0 : Math.min(firstRowIndex + pageSize, totalRows)
  const firstDisplayedRowIndex = totalRows === 0 ? 0 : firstRowIndex + 1

  return (
    <div className="min-w-0 overflow-hidden rounded-lg border border-border bg-card shadow-xs">
      {toolbar}

      <div className="overflow-x-auto">
        <Table className={cn("min-w-240", tableClassName)}>
          <TableHeader className="bg-surface-container-low">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "h-11 px-5 text-xs font-medium uppercase leading-4 tracking-wide text-muted-foreground",
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((tableRow) => (
                <TableRow
                  key={tableRow.id}
                  className="h-[4.5rem] border-transparent hover:bg-muted/35"
                >
                  {tableRow.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "px-5 py-3.5",
                        cell.column.id === "actions" && "text-right"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-40 whitespace-normal text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Search className="size-10 text-muted-foreground" />
                    <p className="text-lg font-bold">{emptyTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {emptyDescription}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-4 border-t border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <p className="text-sm font-medium text-muted-foreground">
          Hiển thị{" "}
          <span className="font-bold text-foreground">
            {firstDisplayedRowIndex} - {lastRowIndex}
          </span>{" "}
          trong tổng số{" "}
          <span className="font-bold text-foreground">
            {totalRows.toLocaleString("vi-VN")}
          </span>{" "}
          {rowLabel}
        </p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={selectedPage === 1}
            aria-label="Trang trước"
            onClick={() => onPageChange(Math.max(1, selectedPage - 1))}
          >
            <ChevronLeft />
          </Button>
          {getVisiblePages(selectedPage, pageCount).map((pageNumber) => (
            <Button
              key={pageNumber}
              type="button"
              variant={pageNumber === selectedPage ? "default" : "outline"}
              size="icon-sm"
              aria-label={`Trang ${pageNumber}`}
              className={cn(
                "border-border/70 font-semibold shadow-none",
                pageNumber === selectedPage && "shadow-sm"
              )}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}
          {pageCount > 3 ? (
            <span className="flex size-8 items-center justify-center text-muted-foreground">
              <Ellipsis className="size-4" />
            </span>
          ) : null}
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={selectedPage === pageCount}
            aria-label="Trang sau"
            onClick={() => onPageChange(Math.min(pageCount, selectedPage + 1))}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

function getVisiblePages(selectedPage: number, pageCount: number) {
  if (pageCount <= 3) {
    return Array.from({ length: pageCount }, (_, pageIndex) => pageIndex + 1)
  }

  if (selectedPage <= 2) {
    return [1, 2, 3]
  }

  if (selectedPage >= pageCount - 1) {
    return [pageCount - 2, pageCount - 1, pageCount]
  }

  return [selectedPage - 1, selectedPage, selectedPage + 1]
}
