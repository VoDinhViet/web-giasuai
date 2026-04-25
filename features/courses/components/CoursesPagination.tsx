"use client";

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
import type { PaginationInfo } from "@/types/api";
import { courseParamsSchema } from "../params/course-params";

interface CoursesPaginationProps {
  pagination: PaginationInfo;
  pageSizeOptions?: number[];
}

export function CoursesPagination({
  pagination,
  pageSizeOptions = [10, 20, 30, 50],
}: CoursesPaginationProps) {
  const [, setQueryParams] = useQueryStates(courseParamsSchema, {
    shallow: false,
  });

  const { currentPage, limit, totalPages, totalRecords } = pagination;
  const startRange = Math.min(totalRecords, (currentPage - 1) * limit + 1);
  const endRange = Math.min(totalRecords, currentPage * limit);

  const handlePageChange = (page: number) => setQueryParams({ page });
  const handleLimitChange = (newLimit: string) =>
    setQueryParams({ limit: Number(newLimit), page: 1 });

  if (totalPages <= 1 && totalRecords <= limit) return null;

  return (
    <div className="mt-10 flex w-full flex-col items-center justify-between gap-4 border-t border-zinc-100 py-6 md:flex-row dark:border-zinc-800/50">
      <div className="flex-1 text-[11px] font-semibold uppercase tracking-tight text-zinc-400">
        Hiển thị{" "}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">
          {startRange}-{endRange}
        </span>{" "}
        trong tổng số{" "}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">
          {totalRecords}
        </span>{" "}
        khóa học
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
        <div className="flex items-center gap-2.5">
          <p className="text-[11px] font-black uppercase tracking-widest text-zinc-500">
            Hiển thị
          </p>
          <Select value={`${limit}`} onValueChange={handleLimitChange}>
            <SelectTrigger className="h-8 min-w-[76px] rounded-md border-zinc-200 bg-white text-xs font-semibold text-zinc-700 shadow-none dark:border-zinc-800 dark:bg-zinc-950">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`} className="text-xs">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[100px] text-center text-[11px] font-black uppercase tracking-widest text-zinc-500">
          Trang{" "}
          <span className="mx-1.5 font-bold text-zinc-950 underline decoration-primary/30 underline-offset-4 dark:text-zinc-100">
            {currentPage}
          </span>
          /<span className="ml-1.5 text-zinc-400">{totalPages}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <PaginationButton
            className="hidden lg:flex"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(1)}
            icon={<IconChevronsLeft size={14} stroke={2.5} />}
          />
          <PaginationButton
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            icon={<IconChevronLeft size={14} stroke={2.5} />}
          />
          <PaginationButton
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            icon={<IconChevronRight size={14} stroke={2.5} />}
          />
          <PaginationButton
            className="hidden lg:flex"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(totalPages)}
            icon={<IconChevronsRight size={14} stroke={2.5} />}
          />
        </div>
      </div>
    </div>
  );
}

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
  className?: string;
}

function PaginationButton({
  onClick,
  disabled,
  icon,
  className,
}: PaginationButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon-sm"
      className={`rounded-md border-zinc-200 bg-white shadow-none transition-all hover:bg-primary/5 hover:text-primary disabled:opacity-30 dark:border-zinc-800 dark:bg-zinc-950 ${className ?? ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </Button>
  );
}
