"use client";

import React from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import { useQueryStates } from "nuqs";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationInfo } from "@/types/api";
import { classParamsSchema } from "@/features/classes/params/class-params";

interface SimplePaginationProps {
  pagination: PaginationInfo;
  pageSizeOptions?: number[];
}

export function SimplePagination({
  pagination,
  pageSizeOptions = [12, 24, 48, 60],
}: SimplePaginationProps) {
  const [, setQueryParams] = useQueryStates(classParamsSchema, {
    shallow: false,
  });

  const { currentPage, limit, totalPages, totalRecords } = pagination;

  // Calculate range display
  const startRange = Math.min(totalRecords, (currentPage - 1) * limit + 1);
  const endRange = Math.min(totalRecords, currentPage * limit);

  const handlePageChange = (newPage: number) =>
    setQueryParams({ page: newPage });

  const handleLimitChange = (newLimit: string) => {
    setQueryParams({
      limit: parseInt(newLimit),
      page: 1,
    });
  };

  if (totalPages <= 1 && totalRecords <= limit) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4 w-full border-t border-zinc-100 dark:border-zinc-800/50 mt-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Range Info Section */}
      <div className="flex-1 text-[11px] font-semibold text-zinc-400 uppercase tracking-tight flex items-center gap-1">
        <span>Hiển thị</span>
        <span className="text-zinc-900 dark:text-zinc-100 font-bold">
          {startRange}-{endRange}
        </span>
        <span>trong tổng số</span>
        <span className="text-zinc-900 dark:text-zinc-100 font-bold">
          {totalRecords}
        </span>
        <span>lớp học</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
        {/* Page Size Selector */}
        <div className="flex items-center gap-2.5">
          <p className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">
            Hiển thị
          </p>
          <Select value={`${limit}`} onValueChange={handleLimitChange}>
            <SelectTrigger className="h-8 min-w-[70px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 transition-colors rounded-md text-xs font-semibold text-zinc-700 shadow-none">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent
              side="top"
              className="rounded-lg border-zinc-200 shadow-xl"
            >
              {pageSizeOptions.map((size) => (
                <SelectItem
                  key={size}
                  value={`${size}`}
                  className="text-xs font-semibold text-zinc-600 focus:bg-primary/5 focus:text-primary"
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current Page Indicator */}
        <div className="flex items-center justify-center text-[11px] font-black text-zinc-500 uppercase tracking-widest min-w-[100px]">
          Trang{" "}
          <span className="text-zinc-950 dark:text-zinc-100 mx-1.5 font-bold underline underline-offset-4 decoration-primary/30">
            {currentPage}
          </span>{" "}
          / <span className="ml-1.5 text-zinc-400">{totalPages}</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1.5">
          <NavButton
            onClick={() => handlePageChange(1)}
            disabled={currentPage <= 1}
            icon={<IconChevronsLeft size={14} stroke={2.5} />}
            className="hidden lg:flex"
          />
          <NavButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            icon={<IconChevronLeft size={14} stroke={2.5} />}
          />
          <NavButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            icon={<IconChevronRight size={14} stroke={2.5} />}
          />
          <NavButton
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage >= totalPages}
            icon={<IconChevronsRight size={14} stroke={2.5} />}
            className="hidden lg:flex"
          />
        </div>
      </div>
    </div>
  );
}

interface NavButtonProps {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
  className?: string;
}

function NavButton({ onClick, disabled, icon, className }: NavButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon-sm"
      className={`border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-primary/5 hover:text-primary transition-all rounded-md shadow-none disabled:opacity-30 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </Button>
  );
}
