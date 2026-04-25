"use client";

import * as React from "react";
import { IconSearch } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UsersSearch } from "../schemas/users-search-schema";

interface UserFiltersProps {
  filters: UsersSearch;
  onFiltersChange: (value: Partial<UsersSearch>) => void;
}

export function UserFilters({
  filters,
  onFiltersChange,
}: UserFiltersProps) {
  const { q = "", role = "all", status = "all" } = filters;
  const [localSearch, setLocalSearch] = React.useState(q);

  // Sync local input with URL search param
  React.useEffect(() => {
    setLocalSearch(q);
  }, [q]);

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== q) {
        onFiltersChange({ q: localSearch });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, q, onFiltersChange]);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between w-full">
      <div className="relative flex-1 lg:max-w-md group">
        <IconSearch className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-950 dark:group-focus-within:text-zinc-50 transition-colors" />
        <Input
          type="text"
          placeholder="Tìm theo tên hoặc email..."
          className="h-10 pl-11 rounded-lg border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Vai trò:</span>
          <Select
            value={role}
            onValueChange={(v) => onFiltersChange({ role: v })}
          >
            <SelectTrigger className="h-10 w-[160px] rounded-lg border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="ADMIN">Quản trị viên</SelectItem>
              <SelectItem value="TEACHER">Giáo viên</SelectItem>
              <SelectItem value="USER">Học viên</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Trạng thái:</span>
          <Select
            value={status}
            onValueChange={(v) => onFiltersChange({ status: v })}
          >
            <SelectTrigger className="h-10 w-[160px] rounded-lg border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Đang hoạt động</SelectItem>
              <SelectItem value="locked">Bị khóa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
