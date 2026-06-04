"use client"

import { useEffect, useState } from "react"
import { Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserRole } from "@/features/users/types"
import { CreateUserDialog } from "../dialogs/create-user-dialog"
import type { UsersSearchParams } from "../../lib/load-users-search-params"
import { getUserRoleLabel } from "../../utils/user-role.util"

type UsersTableFilterProps = {
  filters: Pick<UsersSearchParams, "q" | "role" | "isLocked">
  isLoading?: boolean
  onFiltersChange: (
    filters: Partial<Pick<UsersSearchParams, "q" | "role" | "isLocked">>
  ) => void
}

export function UsersTableFilter({
  filters,
  isLoading = false,
  onFiltersChange,
}: UsersTableFilterProps) {
  return (
    <div className="border-b border-border/70 p-4">
      <div className="grid w-full gap-2 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <DebouncedSearchInput
          key={filters.q}
          value={filters.q}
          placeholder="Tìm tên, email, username"
          onChange={(q) => onFiltersChange({ q })}
        />

        <div className="grid gap-2 sm:grid-cols-[10rem_10rem_auto_auto]">
          <Select
            value={filters.role}
            disabled={isLoading}
            onValueChange={(role) => onFiltersChange({ role })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {Object.values(UserRole).map((role) => (
                <SelectItem key={role} value={role}>
                  {getUserRoleLabel(role)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.isLocked}
            disabled={isLoading}
            onValueChange={(isLocked) => onFiltersChange({ isLocked })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="false">Hoạt động</SelectItem>
              <SelectItem value="true">Đã khóa</SelectItem>
            </SelectContent>
          </Select>

          <Button type="button" variant="outline" disabled={isLoading}>
            <Filter className="size-4" />
            Bộ lọc
          </Button>

          <CreateUserDialog />
        </div>
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
