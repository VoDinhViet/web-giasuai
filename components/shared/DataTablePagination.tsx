"use client";

import { Table } from "@tanstack/react-table";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalItems?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();

  const handleSetPageIndex = (index: number) => {
    onPageChange(index + 1);
  };

  const handlePreviousPage = () => {
    onPageChange(pageIndex);
  };

  const handleNextPage = () => {
    onPageChange(pageIndex + 2);
  };

  const handleSetPageSize = (size: number) => {
    onPageSizeChange(size);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-3 gap-4 w-full">
      <div className="flex-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-tight">
        {table ? (
          <div className="flex items-center gap-1.5">
            <span className="text-primary font-bold">{table.getFilteredSelectedRowModel().rows.length}</span>
            <span className="text-zinc-400">/</span>
            <span>{table.getFilteredRowModel().rows.length} hàng đã chọn</span>
          </div>
        ) : (
          totalItems !== undefined && <span>{totalItems} kết quả</span>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
        <div className="flex items-center gap-2.5">
          <p className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Số hàng</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => handleSetPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 min-w-[70px] border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 hover:bg-white transition-colors rounded-md text-xs font-semibold text-zinc-700">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="rounded-lg border-zinc-200">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`} className="text-xs font-semibold text-zinc-600">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-center text-[11px] font-black text-zinc-500 uppercase tracking-widest min-w-[100px]">
          Trang <span className="text-zinc-950 dark:text-zinc-100 mx-1.5 font-bold underline underline-offset-4 decoration-primary/30">{pageIndex + 1}</span> / <span className="ml-1.5 text-zinc-400">{pageCount}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon-sm"
            className="hidden lg:flex border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-primary/5 hover:text-primary transition-all rounded-md"
            onClick={() => handleSetPageIndex(0)}
            disabled={!canPreviousPage}
          >
            <IconChevronsLeft size={14} stroke={2.5} />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-primary/5 hover:text-primary transition-all rounded-md"
            onClick={handlePreviousPage}
            disabled={!canPreviousPage}
          >
            <IconChevronLeft size={14} stroke={2.5} />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-primary/5 hover:text-primary transition-all rounded-md"
            onClick={handleNextPage}
            disabled={!canNextPage}
          >
            <IconChevronRight size={14} stroke={2.5} />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="hidden lg:flex border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-primary/5 hover:text-primary transition-all rounded-md"
            onClick={() => handleSetPageIndex(pageCount - 1)}
            disabled={!canNextPage}
          >
            <IconChevronsRight size={14} stroke={2.5} />
          </Button>
        </div>
      </div>
    </div>
  );
}
