"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { clientTypeOptions } from "../../constants/client-table-constants"
import type { ClientsSearchParams } from "../../lib/load-clients-search-params"

type ClientsTableFilterProps = {
  filters: Pick<ClientsSearchParams, "q" | "clientType">
  isLoading?: boolean
  onFiltersChange: (
    filters: Partial<Pick<ClientsSearchParams, "q" | "clientType">>
  ) => void
}

export function ClientsTableFilter({
  filters,
  isLoading = false,
  onFiltersChange,
}: ClientsTableFilterProps) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
      <DebouncedSearchInput
        key={filters.q}
        value={filters.q}
        placeholder="Tìm tên, mã khách hàng, email hoặc số điện thoại..."
        onChange={(q) => onFiltersChange({ q })}
      />

      <Select
        value={filters.clientType}
        disabled={isLoading}
        onValueChange={(clientType) => onFiltersChange({ clientType })}
      >
        <SelectTrigger className="w-full sm:w-52">
          <SelectValue placeholder="Loại khách hàng" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả loại</SelectItem>
          {clientTypeOptions.map((clientTypeOption) => (
            <SelectItem
              key={clientTypeOption.value}
              value={clientTypeOption.value}
            >
              {clientTypeOption.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
