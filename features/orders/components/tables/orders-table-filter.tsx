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
import type { OrdersSearchParams } from "../../lib/load-orders-search-params"
import { orderStatusOptions } from "../../constants/order-table-constants"
import type { OrderFormOptions } from "../../types"

type OrdersTableFilterProps = {
  filters: Pick<OrdersSearchParams, "q" | "clientId" | "status">
  formOptions: OrderFormOptions
  isLoading?: boolean
  onFiltersChange: (
    filters: Partial<Pick<OrdersSearchParams, "q" | "clientId" | "status">>
  ) => void
}

export function OrdersTableFilter({
  filters,
  formOptions,
  isLoading = false,
  onFiltersChange,
}: OrdersTableFilterProps) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
      <DebouncedSearchInput
        key={filters.q}
        value={filters.q}
        placeholder="Tìm mã PO, số PR hoặc ghi chú..."
        onChange={(q) => onFiltersChange({ q })}
      />

      <Select
        value={filters.clientId}
        disabled={isLoading}
        onValueChange={(clientId) => onFiltersChange({ clientId })}
      >
        <SelectTrigger className="w-full sm:w-64">
          <SelectValue placeholder="Khách hàng" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả khách hàng</SelectItem>
          {formOptions.clients.map((client) => (
            <SelectItem key={client.id} value={client.id}>
              {client.code} - {client.fullName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        disabled={isLoading}
        onValueChange={(status) => onFiltersChange({ status })}
      >
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả trạng thái</SelectItem>
          {orderStatusOptions.map((orderStatusOption) => (
            <SelectItem
              key={orderStatusOption.value}
              value={orderStatusOption.value}
            >
              {orderStatusOption.label}
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
