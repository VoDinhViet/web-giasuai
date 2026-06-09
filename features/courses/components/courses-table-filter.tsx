"use client"

import { useEffect, useRef } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { CoursesSearchParams } from "../lib/load-courses-search-params"

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
    <div className="border-b border-border/70 bg-muted/25 px-4 py-4 sm:px-5">
      <div className="grid w-full gap-3 xl:grid-cols-[minmax(18rem,1fr)_auto] xl:items-end">
        <div className="grid gap-1.5">
          <label
            htmlFor="courses-search"
            className="text-xs font-medium text-muted-foreground"
          >
            Tìm kiếm
          </label>
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              key={filters.q}
              id="courses-search"
              defaultValue={filters.q}
              placeholder="Tìm mã, tên khóa học"
              className="bg-card pl-8"
              onChange={(event) => handleQueryChange(event.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[14rem_11rem_auto]">
          <div className="grid gap-1.5">
            <label
              htmlFor="courses-category"
              className="text-xs font-medium text-muted-foreground"
            >
              Danh mục
            </label>
            <Input
              key={filters.category}
              id="courses-category"
              defaultValue={filters.category === "all" ? "" : filters.category}
              placeholder="Lọc theo danh mục"
              className="bg-card"
              onChange={(event) => handleCategoryChange(event.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Trạng thái
            </span>
            <Select
              value={filters.status}
              disabled={isLoading}
              onValueChange={(status) => onFiltersChange({ status })}
            >
              <SelectTrigger
                className="w-full"
                aria-label="Lọc theo trạng thái"
              >
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                {courseStatusOptions.map((statusOption) => (
                  <SelectItem
                    key={statusOption.value}
                    value={statusOption.value}
                  >
                    {statusOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end sm:col-span-2 lg:col-span-1 [&_[data-slot=button]]:w-full lg:[&_[data-slot=button]]:w-auto">
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
      </div>
    </div>
  )
}
