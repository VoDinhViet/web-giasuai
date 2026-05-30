'use client'

import React from 'react'
import { IconFilter, IconSearch, IconSortDescending } from '@tabler/icons-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { CreateClassDialog } from './CreateClassDialog'

interface ClassFiltersProps {
  filters: {
    q: string
    isActive: string
    order: string
  }
  onFiltersChange: (value: Record<string, string | number>) => void
}

type SelectOption<TValue extends string> = {
  value: TValue
  label: string
}

type StatusFilter = 'all' | 'true' | 'false'
type SortOrder = 'DESC' | 'ASC'

const statusOptions: SelectOption<StatusFilter>[] = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'true', label: 'Đang hoạt động' },
  { value: 'false', label: 'Tạm dừng' },
]

const sortOptions: SelectOption<SortOrder>[] = [
  { value: 'DESC', label: 'Mới nhất' },
  { value: 'ASC', label: 'Cũ nhất' },
]

export function ClassFilters({ filters, onFiltersChange }: ClassFiltersProps) {
  const { q = '', isActive = 'all', order = 'DESC' } = filters
  const [localSearch, setLocalSearch] = React.useState(q)

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      if (localSearch !== q) {
        onFiltersChange({ q: localSearch })
      }
    }, 500)

    return () => window.clearTimeout(timer)
  }, [localSearch, onFiltersChange, q])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-1 flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full lg:max-w-md">
            <IconSearch className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
            <Input
              placeholder="Tìm kiếm lớp học..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={isActive}
              onValueChange={(value) => onFiltersChange({ isActive: value })}
            >
              <SelectTrigger>
                <span className="flex items-center gap-2">
                  <IconFilter size={14} className="shrink-0 text-zinc-400" />
                  <SelectValue placeholder="Trạng thái" />
                </span>
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={order}
              onValueChange={(value) => onFiltersChange({ order: value })}
            >
              <SelectTrigger>
                <span className="flex items-center gap-2">
                  <IconSortDescending
                    size={14}
                    className="shrink-0 text-zinc-400"
                  />
                  <SelectValue placeholder="Sắp xếp" />
                </span>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <CreateClassDialog />
      </div>
    </div>
  )
}
