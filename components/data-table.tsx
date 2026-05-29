"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { SearchX } from "lucide-react"

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
  isLoading?: boolean
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
  isLoading = false,
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
                      "h-11 px-5 text-[10px] leading-4 font-semibold tracking-[0.08em] text-muted-foreground uppercase",
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
          <TableBody className={cn(isLoading && "opacity-50")}>
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
                  className="whitespace-normal p-0"
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
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        isDisabled={isLoading}
      />
    </>
  )
}

function getColumnClassName(columnId: string) {
  switch (columnId) {
    case "fullName":
      return "w-48"
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
      return "w-40"
    case "status":
      return "w-40"
    case "actions":
      return "w-28"
    default:
      return undefined
  }
}
