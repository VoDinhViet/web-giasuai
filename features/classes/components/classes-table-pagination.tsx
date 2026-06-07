import type { TransitionStartFunction } from "react"
import { useQueryStates } from "nuqs"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Pagination } from "@/types/api"
import { classesSearchParams } from "../lib/search-params"

type ClassesTablePaginationProps = {
  isPending: boolean
  pagination: Pagination
  startTransition: TransitionStartFunction
}

const pageSizeOptions = [10, 20, 50]

export function ClassesTablePagination({
  isPending,
  pagination,
  startTransition,
}: ClassesTablePaginationProps) {
  const [, setFilters] = useQueryStates(classesSearchParams, {
    shallow: false,
    startTransition,
  })
  const totalRecords = pagination.totalRecords
  const limit = pagination.limit
  const totalPages = pagination.totalPages || 1
  const currentPage = Math.max(1, Math.min(pagination.currentPage, totalPages))
  const startIndex = (currentPage - 1) * limit
  const fromRecord = totalRecords === 0 ? 0 : startIndex + 1
  const toRecord =
    totalRecords === 0 ? 0 : Math.min(startIndex + limit, totalRecords)
  const previousPage = pagination.previousPage
  const nextPage = pagination.nextPage
  const canPreviousPage = previousPage > 0 && currentPage > 1
  const canNextPage = nextPage > 0 && currentPage < totalPages

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 border-t border-border/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 text-center text-sm text-muted-foreground sm:text-left">
        <span>
          Hiển thị{" "}
          <span className="font-medium text-foreground">
            {fromRecord.toLocaleString("vi-VN")}
          </span>{" "}
          đến{" "}
          <span className="font-medium text-foreground">
            {toRecord.toLocaleString("vi-VN")}
          </span>{" "}
          trong tổng số{" "}
          <span className="font-medium text-foreground">
            {totalRecords.toLocaleString("vi-VN")}
          </span>{" "}
          lớp học
        </span>
      </div>

      <div className="flex min-w-0 flex-wrap items-center justify-center gap-3 sm:justify-end">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={isPending || !canPreviousPage}
            aria-label="Trang trước"
            onClick={() => setFilters({ page: previousPage })}
            className="h-8 w-8"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <div className="flex items-center gap-1.5 px-1 text-sm font-medium text-muted-foreground select-none">
            <span>Trang</span>
            <span className="flex h-8 min-w-8 items-center justify-center rounded-md border border-border bg-muted/40 px-2 font-semibold text-foreground shadow-xs">
              {currentPage.toLocaleString("vi-VN")}
            </span>
            <span>/</span>
            <span className="text-foreground/80">{totalPages.toLocaleString("vi-VN")}</span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={isPending || !canNextPage}
            aria-label="Trang sau"
            onClick={() => setFilters({ page: nextPage })}
            className="h-8 w-8"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        <Select
          value={`${limit}`}
          disabled={isPending}
          onValueChange={(value) =>
            setFilters({ limit: Number(value), page: 1 })
          }
        >
          <SelectTrigger className="h-8 w-28 text-xs">
            <SelectValue placeholder={`${limit} / trang`} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`} className="text-xs">
                {pageSize} / trang
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
