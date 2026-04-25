"use client";

import React from "react";
import { IconSearch, IconFilter } from "@tabler/icons-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DataTablePagination } from "./DataTablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  // Server-side pagination props
  pageCount?: number;
  totalCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
  loading?: boolean;
  hideBorder?: boolean;
  hideBackground?: boolean;
  toolbar?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Tìm kiếm...",
  pageCount,
  totalCount,
  pagination,
  onPaginationChange,
  loading = false,
  hideBorder = false,
  hideBackground = false,
  toolbar,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      pagination: pagination,
    },
    onPaginationChange: onPaginationChange
      ? (updater) => {
          if (typeof updater === "function") {
            onPaginationChange(updater(pagination!));
          } else {
            onPaginationChange(updater);
          }
        }
      : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: !!onPaginationChange,
  });

  return (
    <div className="space-y-4">
      {toolbar ? (
        <div className={cn(hideBorder)}>{toolbar}</div>
      ) : (
        <div className={cn("flex flex-col sm:flex-row items-center gap-2", hideBorder)}>
          <div className="relative flex-1 w-full">
            <IconSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <Input placeholder={searchPlaceholder} className="pl-9" />
          </div>
        </div>
      )}

      <div
        className={cn(
          "overflow-hidden transition-opacity",
          !hideBorder && "rounded-lg border border-zinc-200 dark:border-zinc-800",
          !hideBackground && "bg-white dark:bg-zinc-950",
          loading ? "opacity-50 pointer-events-none" : "opacity-100",
        )}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-50/50 border-b border-zinc-100 dark:border-zinc-800 h-11"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-5 text-[9px] font-black uppercase tracking-widest text-zinc-500"
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group hover:bg-zinc-50/30 dark:hover:bg-zinc-900/20 transition-all duration-200 border-b border-zinc-50 dark:border-zinc-900 last:border-0 h-14"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-zinc-500"
                >
                  {loading ? "Đang tải dữ liệu..." : "Không có dữ liệu."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Unified Pagination Component */}
        <div className={cn("px-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/20", hideBorder && "px-8")}>
          <DataTablePagination
            table={table}
            totalItems={totalCount}
            onPageChange={(page) => {
              if (onPaginationChange && pagination) {
                onPaginationChange({ ...pagination, pageIndex: page - 1 });
              }
            }}
            onPageSizeChange={(size) => {
              if (onPaginationChange && pagination) {
                onPaginationChange({ ...pagination, pageSize: size });
              }
            }}
            pageSizeOptions={[5, 10, 20, 50]}
          />
        </div>
      </div>
    </div>
  );
}
