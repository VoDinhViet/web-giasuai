"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { SearchX } from "lucide-react"
import * as React from "react"

import { EmptyTable } from "./empty-table"
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
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  tableClassName?: string
  onRowClick?: (row: TData) => void
  isLoading?: boolean
  rowLabel?: string
  actionLabel?: string
  onAction?: () => void
}

export function DataTable<TData, TValue>({
  columns,
  rows,
  pagination,
  onPageChange,
  onPageSizeChange,
  tableClassName,
  onRowClick,
  isLoading = false,
  rowLabel,
  actionLabel,
  onAction,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <div className="relative">
        <Table className={cn("min-w-205", tableClassName)}>
          <TableHeader className="bg-muted/20">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-border/60 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "h-11 border-r border-border/60 px-3 text-xs leading-4 font-bold text-foreground last:border-r-0",
                      getColumnClassName(header.column.id),
                      isActionColumn(header.column.id) && "text-right"
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
          <TableBody className={cn(isLoading && "opacity-50")}>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((tableRow) => (
                <TableRow
                  key={tableRow.id}
                  className={cn(
                    "h-14 border-border/45 hover:bg-primary/5",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={(event) => {
                    if (!onRowClick) {
                      return
                    }

                    if (
                      event.target instanceof Element &&
                      event.target.closest('button,a,[role="button"]')
                    ) {
                      return
                    }

                    onRowClick(tableRow.original)
                  }}
                >
                  {tableRow.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "border-r border-border/50 px-3 py-2 last:border-r-0",
                        getColumnClassName(cell.column.id),
                        isActionColumn(cell.column.id) && "text-right"
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
                  className="p-0 whitespace-normal"
                >
                  <EmptyTable
                    actionLabel={actionLabel}
                    onAction={onAction}
                    icon={<SearchX className="size-5" />}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        pagination={pagination}
        rowLabel={rowLabel}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        isDisabled={isLoading}
      />
    </>
  )
}

function isActionColumn(columnId: string) {
  return columnId === "actions" || columnId === "courseActions"
}

function getColumnClassName(columnId: string) {
  switch (columnId) {
    case "rowNumber":
      return "w-14"
    case "employeeCode":
      return "w-32"
    case "supplierCode":
      return "w-32"
    case "supplierName":
      return "w-72"
    case "supplierPhone":
      return "w-40"
    case "supplierStatus":
      return "w-40"
    case "fullName":
      return "w-56"
    case "username":
      return "w-44"
    case "role":
      return "w-40"
    case "isLocked":
      return "w-36"
    case "department":
      return "w-40"
    case "email":
      return "w-64"
    case "contact":
      return "w-52"
    case "clientType":
      return "w-36"
    case "taxCode":
      return "w-40"
    case "companyName":
      return "w-56"
    case "address":
      return "w-72"
    case "birthDateAndGender":
      return "w-32"
    case "position":
      return "w-44"
    case "status":
      return "w-32"
    case "code":
      return "w-32"
    case "name":
      return "w-72"
    case "courseName":
      return "w-64"
    case "teacherName":
      return "w-48"
    case "studentCount":
      return "w-28"
    case "schedule":
      return "w-44"
    case "startDate":
      return "w-44"
    case "actions":
      return "w-30"
    case "courseActions":
      return "w-44"
    default:
      return undefined
  }
}
