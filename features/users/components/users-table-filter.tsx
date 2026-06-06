"use client"

import { useEffect, useState, type TransitionStartFunction } from "react"
import { useQueryStates } from "nuqs"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserRole } from "@/features/users/types"
import { usersSearchParams } from "../lib/search-params"
import { getUserRoleLabel } from "../utils/user-role.util"
import { CreateUserDialog } from "./create/create-user-dialog"

type UsersTableFilterProps = {
  isPending: boolean
  startTransition: TransitionStartFunction
}

export function UsersTableFilter({
  isPending,
  startTransition,
}: UsersTableFilterProps) {
  const [filters, setFilters] = useQueryStates(usersSearchParams, {
    shallow: false,
    startTransition,
  })

  return (
    <div className="border-b border-border/70 bg-muted/25 px-4 py-4 sm:px-5">
      <div className="grid w-full gap-3 xl:grid-cols-[minmax(18rem,1fr)_auto] xl:items-end">
        <div className="grid gap-1.5">
          <Label htmlFor="users-search">
            Tìm kiếm
          </Label>
          <DebouncedSearchInput
            key={filters.q}
            id="users-search"
            value={filters.q}
            placeholder="Tìm tên, email hoặc username"
            onChange={(q) => setFilters({ q, page: 1 })}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[11rem_11rem_auto]">
          <div className="grid gap-1.5">
            <Label>
              Vai trò
            </Label>
            <Select
              value={filters.role}
              disabled={isPending}
              onValueChange={(role) => setFilters({ role, page: 1 })}
            >
              <SelectTrigger className="w-full" aria-label="Lọc theo vai trò">
                <SelectValue placeholder="Tất cả vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                {Object.values(UserRole).map((role) => (
                  <SelectItem key={role} value={role}>
                    {getUserRoleLabel(role)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label>
              Trạng thái
            </Label>
            <Select
              value={filters.isLocked}
              disabled={isPending}
              onValueChange={(isLocked) => setFilters({ isLocked, page: 1 })}
            >
              <SelectTrigger
                className="w-full"
                aria-label="Lọc theo trạng thái"
              >
                <SelectValue placeholder="Mọi trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Mọi trạng thái</SelectItem>
                <SelectItem value="false">Hoạt động</SelectItem>
                <SelectItem value="true">Đã khóa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end sm:col-span-2 lg:col-span-1 [&_[data-slot=button]]:w-full lg:[&_[data-slot=button]]:w-auto">
            <CreateUserDialog />
          </div>
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
