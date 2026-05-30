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
import { PaginationContent, PaginationItem } from "@/components/ui/pagination";
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
    <div className="mt-10 flex w-full flex-col items-center justify-between gap-4 border-t border-border/70 py-6 animate-in fade-in slide-in-from-bottom-2 duration-500 md:flex-row">
      {/* Range Info Section */}
      <div className="flex flex-1 items-center gap-1 text-[11px] font-semibold uppercase tracking-tight text-muted-foreground">
        <span>Hiển thị</span>
        <span className="font-bold text-foreground">
          {startRange}-{endRange}
        </span>
        <span>trong tổng số</span>
        <span className="font-bold text-foreground">{totalRecords}</span>
        <span>lớp học</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
        {/* Page Size Selector */}
        <div className="flex items-center gap-2.5">
          <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            Hiển thị
          </p>
          <Select value={`${limit}`} onValueChange={handleLimitChange}>
            <SelectTrigger>
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current Page Indicator */}
        <div className="flex min-w-[100px] items-center justify-center text-[11px] font-black uppercase tracking-widest text-muted-foreground">
          Trang{" "}
          <span className="mx-1.5 font-bold text-foreground underline decoration-primary/30 underline-offset-4">
            {currentPage}
          </span>{" "}
          / <span className="ml-1.5 text-muted-foreground">{totalPages}</span>
        </div>

        {/* Navigation Buttons */}
        <nav aria-label="pagination">
          <PaginationContent>
            <li className="hidden lg:block">
              <NavButton
                onClick={() => handlePageChange(1)}
                disabled={currentPage <= 1}
                icon={<IconChevronsLeft size={14} stroke={2.5} />}
              />
            </li>
            <PaginationItem>
              <NavButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                icon={<IconChevronLeft size={14} stroke={2.5} />}
              />
            </PaginationItem>
            <PaginationItem>
              <NavButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                icon={<IconChevronRight size={14} stroke={2.5} />}
              />
            </PaginationItem>
            <li className="hidden lg:block">
              <NavButton
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage >= totalPages}
                icon={<IconChevronsRight size={14} stroke={2.5} />}
              />
            </li>
          </PaginationContent>
        </nav>
      </div>
    </div>
  );
}

interface NavButtonProps {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
}

function NavButton({ onClick, disabled, icon }: NavButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon-sm"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </Button>
  );
}
