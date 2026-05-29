"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import type { SuppliersSearchParams } from "../lib/load-suppliers-search-params"

type SuppliersTableFilterProps = {
  filters: Pick<SuppliersSearchParams, "q">
  onFiltersChange: (filters: Partial<Pick<SuppliersSearchParams, "q">>) => void
}

export function SuppliersTableFilter({
  filters,
  onFiltersChange,
}: SuppliersTableFilterProps) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
      <DebouncedSearchInput
        key={filters.q}
        value={filters.q}
        placeholder="Tìm tên, mã nhà cung cấp, email hoặc số điện thoại..."
        onChange={(q) => onFiltersChange({ q })}
      />
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
    <div className="relative min-w-0 flex-1">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={searchValue}
        placeholder={placeholder}
        className="pl-9"
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </div>
  )
}
