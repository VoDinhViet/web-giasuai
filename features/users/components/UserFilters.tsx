"use client";

import * as React from "react";
import { IconFilter, IconSearch } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UsersSearch } from "../schemas/users-search-schema";

interface UserFiltersProps {
  filters: UsersSearch;
  onFiltersChange: (value: Partial<UsersSearch>) => void;
}

export function UserFilters({ filters, onFiltersChange }: UserFiltersProps) {
  const { q = "", role = "all", status = "all" } = filters;
  const [localSearch, setLocalSearch] = React.useState(q);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== q) {
        onFiltersChange({ q: localSearch });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, q, onFiltersChange]);

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="group relative min-w-0 flex-1 xl:max-w-[480px]">
        <IconSearch
          size={20}
          stroke={2}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
        />
        <Input
          type="text"
          placeholder="Tìm tên, email hoặc tài khoản..."
          className="pl-12"
          value={localSearch}
          onChange={(event) => setLocalSearch(event.target.value)}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3 xl:flex xl:items-center">
        <Select
          value={role}
          onValueChange={(value) => onFiltersChange({ role: value })}
        >
          <SelectTrigger className="min-w-[180px]">
            <SelectValue placeholder="Tất cả vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả vai trò</SelectItem>
            <SelectItem value="ADMIN">Quản trị viên</SelectItem>
            <SelectItem value="TEACHER">Giáo viên</SelectItem>
            <SelectItem value="STUDENT">Học viên</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={status}
          onValueChange={(value) => onFiltersChange({ status: value })}
        >
          <SelectTrigger className="min-w-[160px]">
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
          size="lg"
          className="h-11 rounded-xl border-border/70 bg-muted/30 px-5 font-bold"
        >
          <IconFilter size={18} stroke={2.2} />
          Bộ lọc
        </Button>
      </div>
    </div>
  );
}
