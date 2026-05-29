"use client"

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

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

  return (
    <div className="flex w-full flex-col gap-4 border-t border-border/70 px-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full text-center text-sm text-muted-foreground sm:w-auto sm:text-left">
        <span>
          Hiển thị{" "}
          <span className="font-medium text-foreground">
            {formatNumber(firstDisplayedRowIndex)}
          </span>{" "}
          đến{" "}
          <span className="font-medium text-foreground">
            {formatNumber(lastRowIndex)}
          </span>{" "}
          trong tổng số{" "}
          <span className="font-medium text-foreground">
            {formatNumber(totalRows)}
          </span>{" "}
          {rowLabel}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end sm:gap-4 lg:gap-6">
        {onPageSizeChange ? (
          <div className="flex items-center gap-2">
            <p className="hidden text-xs font-medium text-muted-foreground sm:block">
              Số hàng mỗi trang:
            </p>
            <Select
              value={`${pageSize}`}
              disabled={isDisabled}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger className="h-9 w-[84px]">
                <SelectValue placeholder={`${pageSize}`} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}

        <div className="flex min-w-24 items-center justify-center text-sm font-medium">
          Trang {formatNumber(selectedPage)} / {formatNumber(pageCount)}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="hidden lg:inline-flex"
            disabled={isDisabled || !canPreviousPage}
            aria-label="Trang đầu"
            onClick={() => onPageChange(1)}
          >
            <ChevronsLeft />
          </Button>

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

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="hidden lg:inline-flex"
            disabled={isDisabled || !canNextPage}
            aria-label="Trang cuối"
            onClick={() => onPageChange(pageCount)}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

function formatNumber(value: number) {
  return value.toLocaleString("vi-VN")
}
