import { Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Tìm tên, email hoặc số điện thoại..."
          className="pl-9"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Select defaultValue="all">
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

        <Select defaultValue="all">
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
        >
          <SlidersHorizontal />
          Bộ lọc
        </Button>
      </div>
    </div>
  )
}
