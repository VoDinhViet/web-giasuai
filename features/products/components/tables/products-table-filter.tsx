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
import type { ProductsSearchParams } from "../../lib/load-products-search-params"
import {
  productItemTypeOptions,
  productStatusOptions,
} from "../../constants/product-table-constants"
import type { ProductListOptions } from "../../actions/get-product-list-options"

type ProductsTableFilterProps = {
  filters: Pick<ProductsSearchParams, "q" | "clientId" | "itemType" | "status">
  isLoading?: boolean
  listOptions: ProductListOptions
  onFiltersChange: (
    filters: Partial<
      Pick<ProductsSearchParams, "q" | "clientId" | "itemType" | "status">
    >
  ) => void
}

export function ProductsTableFilter({
  filters,
  isLoading = false,
  listOptions,
  onFiltersChange,
}: ProductsTableFilterProps) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
      <DebouncedSearchInput
        key={filters.q}
        value={filters.q}
        placeholder="Tìm mã sản phẩm hoặc tên sản phẩm..."
        onChange={(q) => onFiltersChange({ q })}
      />

      <Select
        value={filters.clientId}
        disabled={isLoading}
        onValueChange={(clientId) => onFiltersChange({ clientId })}
      >
        <SelectTrigger className="w-full sm:w-56">
          <SelectValue placeholder="Khách hàng" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả khách hàng</SelectItem>
          {listOptions.clients.map((client) => (
            <SelectItem key={client.id} value={client.id}>
              {client.code} - {client.fullName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.itemType}
        disabled={isLoading}
        onValueChange={(itemType) => onFiltersChange({ itemType })}
      >
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Loại sản phẩm" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả loại</SelectItem>
          {productItemTypeOptions.map((productItemTypeOption) => (
            <SelectItem
              key={productItemTypeOption.value}
              value={productItemTypeOption.value}
            >
              {productItemTypeOption.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
          {productStatusOptions.map((productStatusOption) => (
            <SelectItem
              key={productStatusOption.value}
              value={productStatusOption.value}
            >
              {productStatusOption.label}
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
