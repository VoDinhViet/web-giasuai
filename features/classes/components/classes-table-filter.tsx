"use client"

import { useEffect, useState, type TransitionStartFunction } from "react"
import { useQueryStates } from "nuqs"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { classesSearchParams } from "../lib/search-params"

type ClassesTableFilterProps = {
  isPending: boolean
  startTransition: TransitionStartFunction
}

type ClassFilters = {
  courseId: string
  instructorId: string
  q: string
  status: string
}

const classStatusOptions = [
  { value: "ACTIVE", label: "Đang học" },
  { value: "UPCOMING", label: "Sắp mở" },
  { value: "COMPLETED", label: "Hoàn thành" },
  { value: "PAUSED", label: "Tạm dừng" },
]

const hasActiveFilters = (filters: ClassFilters) =>
  Boolean(filters.q) ||
  filters.status !== "all" ||
  filters.courseId !== "all" ||
  filters.instructorId !== "all"

export function ClassesTableFilter({
  isPending,
  startTransition,
}: ClassesTableFilterProps) {
  const [filters, setFilters] = useQueryStates(classesSearchParams, {
    shallow: false,
    startTransition,
  })
  const hasFilters = hasActiveFilters(filters)

  return (
    <div className="min-w-0 border-b border-border/70 bg-muted/25 px-4 py-4 sm:px-5">
      <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_11rem_auto] lg:items-end">
        <div className="grid min-w-0 gap-1.5">
          <Label htmlFor="classes-search">Tìm kiếm</Label>
          <DebouncedSearchInput
            key={filters.q}
            id="classes-search"
            value={filters.q}
            placeholder="Tìm mã lớp, tên lớp, khóa học, giáo viên"
            onChange={(q) => setFilters({ q, page: 1 })}
          />
        </div>

        <div className="grid min-w-0 gap-1.5">
          <Label>Trạng thái</Label>
          <Select
            value={filters.status}
            disabled={isPending}
            onValueChange={(status) => setFilters({ status, page: 1 })}
          >
            <SelectTrigger className="w-full" aria-label="Lọc theo trạng thái">
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
        </div>

        <div className="flex min-w-0 items-end [&_[data-slot=button]]:w-full lg:[&_[data-slot=button]]:w-auto">
          <Button
            type="button"
            variant="outline"
            disabled={isPending || !hasFilters}
            onClick={() =>
              setFilters({
                q: "",
                status: "all",
                courseId: "all",
                instructorId: "all",
                page: 1,
              })
            }
          >
            Xóa lọc
          </Button>
        </div>
      </div>
    </div>
  )
}

type DebouncedSearchInputProps = {
  id?: string
  value: string
  placeholder: string
  onChange: (value: string) => void
}

function DebouncedSearchInput({
  id,
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
        id={id}
        value={searchValue}
        placeholder={placeholder}
        className="bg-card pl-8"
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </div>
  )
}
