"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationInfo } from "@/types/api";
import { cn } from "@/lib/utils";

interface UserTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  meta: PaginationInfo;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  isPending?: boolean;
}

export function UserTable<TData>({
  data,
  columns,
  meta,
  onPageChange,
  onPageSizeChange,
  isPending,
}: UserTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: meta.totalPages,
    state: {
      pagination: {
        pageIndex: meta.currentPage - 1,
        pageSize: meta.limit,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const nextState = updater({
          pageIndex: meta.currentPage - 1,
          pageSize: meta.limit,
        });

        if (nextState.pageSize !== meta.limit) {
          onPageSizeChange(nextState.pageSize);
          return;
        }

        onPageChange(nextState.pageIndex + 1);
      }
    },
  });

  const firstPage = Math.max(
    1,
    Math.min(meta.currentPage - 1, Math.max(meta.totalPages - 2, 1)),
  );
  const pageNumbers = Array.from(
    { length: Math.min(meta.totalPages, 3) },
    (_, index) => firstPage + index,
  );
  const startItem =
    meta.totalRecords === 0 ? 0 : (meta.currentPage - 1) * meta.limit + 1;
  const endItem = Math.min(meta.currentPage * meta.limit, meta.totalRecords);

  return (
    <div className="flex flex-col overflow-hidden">
      <div
        className={cn(
          "relative transition-opacity duration-200",
          isPending ? "pointer-events-none opacity-60" : "opacity-100",
        )}
      >
        <Table className="min-w-[900px]">
          <TableHeader className="border-b border-border/70 bg-muted/35">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-none hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-14 px-6 align-middle text-left text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="divide-y divide-border/40">
            {data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group border-none bg-card transition-colors hover:bg-primary/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-6 py-5 align-middle"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-44 px-8 text-center text-sm font-medium text-muted-foreground"
                >
                  Không tìm thấy người dùng nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-4 border-t border-border/40 bg-muted/20 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          Hiển thị{" "}
          <span className="font-bold text-foreground">
            {startItem} - {endItem}
          </span>{" "}
          trong tổng số{" "}
          <span className="font-bold text-foreground">
            {meta.totalRecords.toLocaleString("vi-VN")}
          </span>{" "}
          người dùng
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-lg"
            className="rounded-xl border-border/70 disabled:opacity-40"
            onClick={() => onPageChange(meta.currentPage - 1)}
            disabled={meta.currentPage <= 1}
          >
            <IconChevronLeft size={18} stroke={2.2} />
          </Button>

          {pageNumbers.map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={pageNumber === meta.currentPage ? "default" : "outline"}
              size="icon-lg"
              className={cn(
                "rounded-xl font-bold shadow-none",
                pageNumber !== meta.currentPage && "border-border/70 bg-card",
              )}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}

          {firstPage + pageNumbers.length - 1 < meta.totalPages ? (
            <span className="px-2 text-sm font-semibold text-muted-foreground">
              ...
            </span>
          ) : null}

          <Button
            variant="outline"
            size="icon-lg"
            className="rounded-xl border-border/70 disabled:opacity-40"
            onClick={() => onPageChange(meta.currentPage + 1)}
            disabled={meta.currentPage >= meta.totalPages}
          >
            <IconChevronRight size={18} stroke={2.2} />
          </Button>
        </div>
      </div>
    </div>
  );
}
