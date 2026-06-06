"use client"

import { useEffect, useState } from "react"
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
import type { ClassesSearchParams } from "../../lib/load-classes-search-params"

type ClassesTableFilterProps = {
  filters: Pick<
    ClassesSearchParams,
    "q" | "status" | "courseId" | "instructorId"
  >
  isLoading?: boolean
  onFiltersChange: (
    filters: Partial<
      Pick<ClassesSearchParams, "q" | "status" | "courseId" | "instructorId">
    >
  ) => void
}

const classStatusOptions = [
  { value: "ACTIVE", label: "Đang học" },
  { value: "UPCOMING", label: "Sắp mở" },
  { value: "COMPLETED", label: "Hoàn thành" },
  { value: "PAUSED", label: "Tạm dừng" },
]

const hasActiveFilters = (filters: ClassesTableFilterProps["filters"]) =>
  Boolean(filters.q) ||
  filters.status !== "all" ||
  filters.courseId !== "all" ||
  filters.instructorId !== "all"

export function ClassesTableFilter({
  filters,
  isLoading = false,
  onFiltersChange,
}: ClassesTableFilterProps) {
  const hasFilters = hasActiveFilters(filters)

  return (
    <div className="border-b border-border/70 bg-muted/20 p-4 sm:p-5">
      <div className="grid w-full gap-2 sm:grid-cols-[minmax(0,1fr)_11rem_auto]">
        <DebouncedSearchInput
          key={filters.q}
          value={filters.q}
          placeholder="Tìm mã lớp, tên lớp, khóa học, giáo viên"
          onChange={(q) => onFiltersChange({ q })}
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
            {classStatusOptions.map((statusOption) => (
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
            onFiltersChange({
              q: "",
              status: "all",
              courseId: "all",
              instructorId: "all",
            })
          }
        >
          Xóa lọc
        </Button>
      </div>
    </div>
  )
}

type DebouncedSearchInputProps = {
  value: string
  placeholder: string
  onChange: (value: string) => void
}

function DebouncedSearchInput({
  value,
  placeholder,
  onChange,
}: DebouncedSearchInputProps) {
  const [searchValue, setSearchValue] = useState(value)

  useEffect(() => {
    if (searchValue === value) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      onChange(searchValue)
    }, 400)

    return () => window.clearTimeout(timeoutId)
  }, [onChange, searchValue, value])

  return (
    <div className="relative min-w-0">
      <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={searchValue}
        placeholder={placeholder}
        className="pl-8"
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </div>
  )
}
