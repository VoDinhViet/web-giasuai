"use client"

import { useEffect, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { CoursesSearchParams } from "../../lib/load-courses-search-params"

type CoursesTableFilterProps = {
  filters: Pick<CoursesSearchParams, "q" | "status" | "category">
  isLoading?: boolean
  onFiltersChange: (
    filters: Partial<Pick<CoursesSearchParams, "q" | "status" | "category">>
  ) => void
}

const courseStatusOptions = [
  { value: "PUBLISHED", label: "Đang mở" },
  { value: "DRAFT", label: "Bản nháp" },
  { value: "ARCHIVED", label: "Lưu trữ" },
]

const hasActiveFilters = (filters: CoursesTableFilterProps["filters"]) =>
  Boolean(filters.q) || filters.status !== "all" || filters.category !== "all"

export function CoursesTableFilter({
  filters,
  isLoading = false,
  onFiltersChange,
}: CoursesTableFilterProps) {
  const hasFilters = hasActiveFilters(filters)
  const queryTimeoutRef = useRef<number | null>(null)
  const categoryTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (queryTimeoutRef.current) {
        window.clearTimeout(queryTimeoutRef.current)
      }
      if (categoryTimeoutRef.current) {
        window.clearTimeout(categoryTimeoutRef.current)
      }
    }
  }, [])

  function handleQueryChange(query: string) {
    if (queryTimeoutRef.current) {
      window.clearTimeout(queryTimeoutRef.current)
    }

    queryTimeoutRef.current = window.setTimeout(() => {
      onFiltersChange({ q: query })
    }, 400)
  }

  function handleCategoryChange(category: string) {
    if (categoryTimeoutRef.current) {
      window.clearTimeout(categoryTimeoutRef.current)
    }

    categoryTimeoutRef.current = window.setTimeout(() => {
      onFiltersChange({ category: category.trim() || "all" })
    }, 400)
  }

  return (
    <div className="flex flex-col gap-4 border-b border-border/70 bg-muted/20 p-4 sm:p-5 lg:flex-row lg:items-center">
      <div className="min-w-0 flex-1">
        <h2 className="text-lg leading-7 font-semibold text-foreground">
          Danh sách khóa học
        </h2>
        <p className="text-sm text-muted-foreground">
          Quản lý trạng thái xuất bản, lịch học và học viên đăng ký.
        </p>
      </div>

      <div className="flex w-full flex-col gap-2 sm:grid sm:grid-cols-[minmax(0,18rem)_minmax(0,14rem)_11rem_auto] lg:w-auto">
        <Input
          key={filters.q}
          defaultValue={filters.q}
          placeholder="Tìm mã, tên khóa học"
          onChange={(event) => handleQueryChange(event.target.value)}
        />

        <Input
          key={filters.category}
          defaultValue={filters.category === "all" ? "" : filters.category}
          placeholder="Lọc theo danh mục"
          onChange={(event) => handleCategoryChange(event.target.value)}
        />

        <Select
          value={filters.status}
          disabled={isLoading}
          onValueChange={(status) => onFiltersChange({ status })}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            {courseStatusOptions.map((statusOption) => (
              <SelectItem key={statusOption.value} value={statusOption.value}>
                {statusOption.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          disabled={isLoading || !hasFilters}
          onClick={() =>
            onFiltersChange({ q: "", status: "all", category: "all" })
          }
        >
          Xóa lọc
        </Button>
      </div>
    </div>
  )
}
