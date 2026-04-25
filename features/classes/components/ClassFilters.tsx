"use client";

import React from "react";
import {
  IconFilter,
  IconSearch,
  IconSortDescending,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CreateClassDialog } from "./CreateClassDialog";

interface ClassFiltersProps {
  filters: {
    q: string;
    isActive: string;
    order: string;
  };
  onFiltersChange: (value: Record<string, string | number>) => void;
}

export function ClassFilters({
  filters,
  onFiltersChange,
}: ClassFiltersProps) {
  const { q = "", isActive = "all", order = "DESC" } = filters;
  const [localSearch, setLocalSearch] = React.useState(q);

  React.useEffect(() => {
    setLocalSearch(q);
  }, [q]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      if (localSearch !== q) {
        onFiltersChange({ q: localSearch });
      }
    }, 500);

    return () => window.clearTimeout(timer);
  }, [localSearch, onFiltersChange, q]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-1 flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full lg:max-w-md">
            <IconSearch className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
            <Input
              placeholder="Tìm kiếm lớp học..."
              className="h-10 pl-9 text-xs"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={isActive}
              onValueChange={(value) => onFiltersChange({ isActive: value })}
            >
              <SelectTrigger className="h-10 w-fit min-w-[160px] gap-2 whitespace-nowrap px-3 text-xs">
                <IconFilter size={14} className="shrink-0 text-zinc-400" />
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">
                  Tất cả trạng thái
                </SelectItem>
                <SelectItem value="true" className="text-xs">
                  Đang hoạt động
                </SelectItem>
                <SelectItem value="false" className="text-xs">
                  Tạm dừng
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={order}
              onValueChange={(value) => onFiltersChange({ order: value })}
            >
              <SelectTrigger className="h-10 w-fit min-w-[140px] gap-2 whitespace-nowrap px-3 text-xs">
                <IconSortDescending size={14} className="shrink-0 text-zinc-400" />
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DESC" className="text-xs">
                  Mới nhất
                </SelectItem>
                <SelectItem value="ASC" className="text-xs">
                  Cũ nhất
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <CreateClassDialog />
      </div>
    </div>
  );
}
