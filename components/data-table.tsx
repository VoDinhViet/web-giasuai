"use client"

import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Search } from "lucide-react"

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
import { DataTablePagination } from "./data-table-pagination"

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  rows: TData[]
  pagination: Pagination
  rowLabel: string
  emptyTitle: string
  emptyDescription: string
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
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
  onPageSizeChange,
  toolbar,
  tableClassName,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="min-w-0 overflow-hidden rounded-(--radius) border border-border/80 bg-card shadow-xs">
      {toolbar}
      <Table className={cn("min-w-205", tableClassName)}>
        <TableHeader className="bg-muted/30">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-border/60 hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "h-11 px-5 text-[10px] font-semibold uppercase leading-4 tracking-[0.08em] text-muted-foreground",
                    getColumnClassName(header.column.id),
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
                className="h-16 border-border/35 hover:bg-muted/25"
              >
                {tableRow.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "px-5 py-3",
                      getColumnClassName(cell.column.id),
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
                colSpan={columns.length}
                className="h-36 whitespace-normal text-center"
              >
                <div className="flex flex-col items-center justify-center gap-2.5">
                  <Search className="size-9 text-muted-foreground" />
                  <p className="text-base font-semibold">{emptyTitle}</p>
                  <p className="text-sm text-muted-foreground">
                    {emptyDescription}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination
        pagination={pagination}
        rowLabel={rowLabel}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  )
}

function getColumnClassName(columnId: string) {
  switch (columnId) {
    case "fullName":
      return "w-48"
    case "contact":
      return "w-52"
    case "birthDateAndGender":
      return "w-32"
    case "position":
      return "w-40"
    case "status":
      return "w-40"
    case "actions":
      return "w-28"
    default:
      return undefined
  }
}
