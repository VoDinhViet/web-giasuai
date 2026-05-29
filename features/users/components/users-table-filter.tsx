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
import type { Role } from "@/types/user"
import type { UsersSearchParams } from "../lib/load-users-search-params"
import { UserStatus } from "../types"

type UsersTableFilterProps = {
  roles: Role[]
  filters: Pick<UsersSearchParams, "q" | "roleId" | "status">
  isLoading?: boolean
  onFiltersChange: (
    filters: Partial<Pick<UsersSearchParams, "q" | "roleId" | "status">>
  ) => void
}

export function UsersTableFilter({
  roles,
  filters,
  isLoading = false,
  onFiltersChange,
}: UsersTableFilterProps) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
      <DebouncedSearchInput
        key={filters.q}
        value={filters.q}
        placeholder="Tìm tên, email hoặc số điện thoại..."
        onChange={(q) => onFiltersChange({ q })}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Select
          value={filters.roleId}
          disabled={isLoading}
          onValueChange={(roleId) => onFiltersChange({ roleId })}
        >
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="Tất cả Chức vụ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả Chức vụ</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          disabled={isLoading}
          onValueChange={(status) => onFiltersChange({ status })}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Trạng thái</SelectItem>
            <SelectItem value={UserStatus.ACTIVE}>Đang hoạt động</SelectItem>
            <SelectItem value={UserStatus.INACTIVE}>Ngừng hoạt động</SelectItem>
          </SelectContent>
        </Select>

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
