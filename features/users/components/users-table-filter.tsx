import { Search, SlidersHorizontal } from "lucide-react"
import { useQueryStates } from "nuqs"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usersSearchParams } from "../lib/search-params"
import type { UserStatus } from "../types"

type StatusFilter = "all" | UserStatus

const positionOptions = [
  "Quản lý sản xuất",
  "Tổ trưởng gia công",
  "Nhân viên kho",
  "Kỹ thuật viên",
  "Kế toán sản xuất",
  "Giám sát chất lượng",
  "Nhân viên hành chính",
]

export function UsersTableFilter() {
  const [params, setParams] = useQueryStates(usersSearchParams)
  const selectedStatusFilter: StatusFilter =
    params.status === "active" || params.status === "locked"
      ? params.status
      : "all"

  function handleSearchChange(nextSearchKeyword: string) {
    setParams({
      search: nextSearchKeyword || null,
      page: 1,
    })
  }

  function handlePositionFilterChange(nextPositionFilter: string) {
    setParams({
      position: nextPositionFilter === "all" ? null : nextPositionFilter,
      page: 1,
    })
  }

  function handleStatusFilterChange(nextStatusFilter: StatusFilter) {
    setParams({
      status: nextStatusFilter === "all" ? null : nextStatusFilter,
      page: 1,
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={params.search}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Tìm tên, email hoặc số điện thoại..."
          className="pl-9"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Select
          value={params.position}
          onValueChange={handlePositionFilterChange}
        >
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="Tất cả Chức vụ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả Chức vụ</SelectItem>
            {positionOptions.map((positionOption) => (
              <SelectItem key={positionOption} value={positionOption}>
                {positionOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedStatusFilter}
          onValueChange={(nextStatusFilter) =>
            handleStatusFilterChange(nextStatusFilter as StatusFilter)
          }
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Trạng thái</SelectItem>
            <SelectItem value="active">Đang hoạt động</SelectItem>
            <SelectItem value="locked">Đã khóa</SelectItem>
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-lg border-border/80 bg-muted/45 px-4 shadow-none"
        >
          <SlidersHorizontal />
          Bộ lọc
        </Button>
      </div>
    </div>
  )
}
