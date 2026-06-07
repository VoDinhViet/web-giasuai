"use client"

import { useEffect, useState, useTransition } from "react"
import { useQueryStates } from "nuqs"
import {
  BookOpenCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { Pagination } from "@/types/api"
import { assignClassCourseSearchParams } from "../../lib/search-params"
import type { UnassignedClassCourse } from "../../types"

type UnassignedCoursePickerProps = {
  courses: UnassignedClassCourse[]
  pagination: Pagination
  selectedCourseId: string
  onSelect: (courseId: string) => void
}

const pageSizeOptions = [10, 20, 50]

export function UnassignedCoursePicker({
  courses,
  pagination,
  selectedCourseId,
  onSelect,
}: UnassignedCoursePickerProps) {
  const [isPending, startTransition] = useTransition()
  const [filters, setFilters] = useQueryStates(assignClassCourseSearchParams, {
    shallow: false,
    startTransition,
  })
  const [searchText, setSearchText] = useState(filters.q)

  useEffect(() => {
    if (searchText === filters.q) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setFilters({ page: 1, q: searchText.trim() })
    }, 400)

    return () => window.clearTimeout(timeoutId)
  }, [filters.q, searchText, setFilters])

  const totalRecords = pagination.totalRecords
  const limit = pagination.limit
  const totalPages = pagination.totalPages || 1
  const currentPage = Math.max(1, Math.min(pagination.currentPage, totalPages))
  const startIndex = (currentPage - 1) * limit
  const fromRecord = totalRecords === 0 ? 0 : startIndex + 1
  const toRecord =
    totalRecords === 0 ? 0 : Math.min(startIndex + limit, totalRecords)
  const canPreviousPage = pagination.previousPage > 0 && currentPage > 1
  const canNextPage = pagination.nextPage > 0 && currentPage < totalPages

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b border-border/70 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <CardTitle>Chọn khóa học</CardTitle>
            <CardDescription className="mt-1">
              Danh sách chỉ hiện các khóa chưa được gắn vào lớp này.
            </CardDescription>
          </div>
          <div className="w-full min-w-0 lg:w-96">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    setFilters({ page: 1, q: searchText.trim() })
                  }
                }}
                className="bg-card pl-9"
                placeholder="Tìm theo mã hoặc tên khóa"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5 p-5">
        {courses.length > 0 ? (
          <div className={cn("grid gap-3 lg:grid-cols-2", isPending && "opacity-60")}>
            {courses.map((course) => {
              const isSelected = selectedCourseId === course.id

              return (
                <button
                  key={course.id}
                  type="button"
                  className={cn(
                    "group min-w-0 rounded border border-border/70 bg-card p-4 text-left transition-colors hover:border-primary/35 hover:bg-primary/5 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/35 focus-visible:outline-none",
                    isSelected &&
                      "border-primary/50 bg-primary/10 ring-1 ring-primary/20"
                  )}
                  onClick={() => onSelect(course.id)}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground transition-colors",
                        isSelected && "bg-primary text-primary-foreground"
                      )}
                    >
                      {isSelected ? <Check /> : <BookOpenCheck />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm leading-5 font-semibold text-foreground">
                        {course.code} - {course.name}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                        {course.category} - {course.lessonCount} bài học
                      </span>
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <Alert>
            <Sparkles className="size-4" />
            <AlertTitle>Không còn khóa học để thêm</AlertTitle>
            <AlertDescription>
              Tất cả khóa học trong kho hiện đã được gắn vào lớp này hoặc không
              tìm thấy khóa phù hợp với từ khóa hiện tại.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <div className="flex w-full min-w-0 flex-col gap-4 border-t border-border/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 text-center text-sm text-muted-foreground sm:text-left">
          Hiển thị <span className="font-medium text-foreground">{fromRecord}</span> đến{" "}
          <span className="font-medium text-foreground">{toRecord}</span> trong tổng số{" "}
          <span className="font-medium text-foreground">{totalRecords}</span> khóa học
        </div>

        <div className="flex min-w-0 flex-wrap items-center justify-center gap-3 sm:justify-end">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              disabled={isPending || !canPreviousPage}
              aria-label="Trang trước"
              onClick={() => setFilters({ page: pagination.previousPage })}
              className="h-8 w-8"
            >
              <ChevronLeft className="size-4" />
            </Button>

            <div className="flex items-center gap-1.5 px-1 text-sm font-medium text-muted-foreground select-none">
              <span>Trang</span>
              <span className="flex h-8 min-w-8 items-center justify-center rounded-md border border-border bg-muted/40 px-2 font-semibold text-foreground shadow-xs">
                {currentPage}
              </span>
              <span>/</span>
              <span className="text-foreground/80">{totalPages}</span>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              disabled={isPending || !canNextPage}
              aria-label="Trang sau"
              onClick={() => setFilters({ page: pagination.nextPage })}
              className="h-8 w-8"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <Select
            value={`${limit}`}
            disabled={isPending}
            onValueChange={(value) => setFilters({ limit: Number(value), page: 1 })}
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
    </Card>
  )
}
