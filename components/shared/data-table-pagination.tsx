"use client"

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Pagination } from "@/types/api"

type DataTablePaginationProps = {
  pagination: Pagination
  rowLabel?: string
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  pageSizeOptions?: number[]
  isDisabled?: boolean
}

export function DataTablePagination({
  pagination,
  rowLabel = "bản ghi",
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
  isDisabled = false,
}: DataTablePaginationProps) {
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
  const canPreviousPage = selectedPage > 1
  const canNextPage = selectedPage < pageCount
  const visiblePageItems = getVisiblePageItems(selectedPage, pageCount)

  return (
    <div className="flex w-full flex-col gap-4 border-t border-border/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full text-center text-sm text-muted-foreground sm:w-auto sm:text-left">
        <span>
          Hiển thị{" "}
          <span className="font-medium text-foreground">
            {firstDisplayedRowIndex.toLocaleString("vi-VN")}
          </span>{" "}
          đến{" "}
          <span className="font-medium text-foreground">
            {lastRowIndex.toLocaleString("vi-VN")}
          </span>{" "}
          trong tổng số{" "}
          <span className="font-medium text-foreground">
            {totalRows.toLocaleString("vi-VN")}
          </span>{" "}
          {rowLabel}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={isDisabled || !canPreviousPage}
            aria-label="Trang trước"
            onClick={() => onPageChange(selectedPage - 1)}
          >
            <ChevronLeft />
          </Button>

          {visiblePageItems.map((pageItem, itemIndex) =>
            pageItem === "ellipsis" ? (
              <span
                key={`ellipsis-${itemIndex}`}
                className="flex size-8 items-center justify-center text-sm font-medium text-muted-foreground"
              >
                ...
              </span>
            ) : (
              <Button
                key={pageItem}
                type="button"
                variant={pageItem === selectedPage ? "default" : "outline"}
                size="icon-sm"
                disabled={isDisabled}
                aria-label={`Trang ${pageItem}`}
                aria-current={pageItem === selectedPage ? "page" : undefined}
                onClick={() => onPageChange(pageItem)}
              >
                {pageItem}
              </Button>
            )
          )}

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={isDisabled || !canNextPage}
            aria-label="Trang sau"
            onClick={() => onPageChange(selectedPage + 1)}
          >
            <ChevronRight />
          </Button>
        </div>

        {onPageSizeChange ? (
          <Select
            value={`${pageSize}`}
            disabled={isDisabled}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-28 text-xs">
              <SelectValue placeholder={`${pageSize} / trang`} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`} className="text-xs">
                  {size} / trang
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}
      </div>
    </div>
  )
}

function getVisiblePageItems(selectedPage: number, pageCount: number) {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, pageIndex) => pageIndex + 1)
  }

  if (selectedPage <= 3) {
    return [1, 2, 3, "ellipsis", pageCount] as const
  }

  if (selectedPage >= pageCount - 2) {
    return [1, "ellipsis", pageCount - 2, pageCount - 1, pageCount] as const
  }

  return [
    1,
    "ellipsis",
    selectedPage - 1,
    selectedPage,
    selectedPage + 1,
    "ellipsis",
    pageCount,
  ] as const
}
