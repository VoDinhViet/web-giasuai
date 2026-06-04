"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import type { Route } from "next"
import { Plus, RefreshCw, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { SuppliersSearchParams } from "../../lib/load-suppliers-search-params"
import type { SupplierGroup } from "../../types"

type SuppliersTableFilterProps = {
  filters: Pick<SuppliersSearchParams, "q" | "supplierGroupId">
  isLoading?: boolean
  supplierGroupOptions: SupplierGroup[]
  onFiltersChange: (
    filters: Partial<Pick<SuppliersSearchParams, "q" | "supplierGroupId">>
  ) => void
}

export function SuppliersTableFilter({
  filters,
  isLoading = false,
  supplierGroupOptions,
  onFiltersChange,
}: SuppliersTableFilterProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-border/70 p-4 sm:p-5 xl:flex-row xl:items-end">
      <DebouncedSearchInput
        key={filters.q}
        value={filters.q}
        placeholder="Tìm kiếm theo mã, tên, email hoặc số điện thoại..."
        onChange={(q) => onFiltersChange({ q })}
      />
      <StaticFilterSelect label="Trạng thái" />
      <SupplierGroupFilterSelect
        value={filters.supplierGroupId}
        supplierGroupOptions={supplierGroupOptions}
        disabled={isLoading}
        onValueChange={(supplierGroupId) =>
          onFiltersChange({ supplierGroupId })
        }
      />
      <StaticFilterSelect label="Quốc gia" />
      <div className="flex flex-col gap-3 sm:flex-row xl:ml-auto">
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={isLoading}
          onClick={() => onFiltersChange({ q: "", supplierGroupId: "all" })}
        >
          <RefreshCw className="size-4" />
          Làm mới
        </Button>
        <Button asChild type="button" size="lg">
          <Link href={"/manage/suppliers/create" as Route}>
            <Plus className="size-4" />
            Thêm nhà cung cấp
          </Link>
        </Button>
      </div>
    </div>
  )
}

type SupplierGroupFilterSelectProps = {
  value: string
  supplierGroupOptions: SupplierGroup[]
  disabled?: boolean
  onValueChange: (supplierGroupId: string) => void
}

function SupplierGroupFilterSelect({
  value,
  supplierGroupOptions,
  disabled = false,
  onValueChange,
}: SupplierGroupFilterSelectProps) {
  return (
    <label className="grid min-w-0 gap-2 xl:w-44">
      <span className="text-xs leading-4 font-medium text-foreground">
        Nhóm NCC
      </span>
      <Select
        value={value}
        disabled={disabled}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder="Tất cả" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          {supplierGroupOptions.map((supplierGroup) => (
            <SelectItem key={supplierGroup.id} value={supplierGroup.id}>
              {supplierGroup.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  )
}

function StaticFilterSelect({ label }: { label: string }) {
  return (
    <label className="grid min-w-0 gap-2 xl:w-44">
      <span className="text-xs leading-4 font-medium text-foreground">
        {label}
      </span>
      <Select value="all">
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder="Tất cả" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
        </SelectContent>
      </Select>
    </label>
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
      <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={searchValue}
        placeholder={placeholder}
        className="h-10 pl-10"
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </div>
  )
}
