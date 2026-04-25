"use client";

import { flexRender, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTablePagination } from "@/components/shared/DataTablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PaginationInfo } from "@/types/api";

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

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "relative transition-opacity duration-200",
          isPending ? "opacity-60 pointer-events-none" : "opacity-100"
        )}
      >
        <Table>
          <TableHeader className="bg-zinc-50/80 dark:bg-zinc-900/50 border-b border-zinc-200/60 dark:border-zinc-800/60">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-none"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-12 px-6 align-middle md:px-8 font-black text-zinc-950 dark:text-zinc-400 uppercase text-[10px] tracking-[0.15em]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group border-b border-zinc-100/60 dark:border-zinc-800/60 transition-colors hover:bg-indigo-50/20 dark:hover:bg-zinc-900/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-4 align-middle md:px-8">
                      <div className="transition-transform group-hover:translate-x-0.5 duration-200">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-52 px-8 text-center text-sm font-medium text-zinc-400 dark:text-zinc-500"
                >
                  Không tìm thấy thành viên nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="border-t border-zinc-100 dark:border-zinc-800/50 px-6 md:px-8">
        <DataTablePagination
          table={table}
          totalItems={meta.totalRecords}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}
