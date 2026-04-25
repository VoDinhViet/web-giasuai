"use client";

import React from "react";
import Link from "next/link";
import { IconBook2, IconDotsVertical, IconEye, IconCopy, IconPencil, IconArchive } from "@tabler/icons-react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
} from "@tanstack/react-table";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Class } from "@/types/class";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PaginationInfo } from "@/types/api";
import { DataTablePagination } from "@/components/shared/DataTablePagination";
import { TeacherInfo } from "./TeacherInfo";

interface ClassTableProps {
  data: Class[];
  pagination: PaginationInfo;
}

export function ClassTable({ data, pagination }: ClassTableProps) {
  const columns = React.useMemo<ColumnDef<Class>[]>(
    () => [
      {
        header: "Lớp học",
        accessorKey: "name",
        cell: ({ row }) => {
          const cls = row.original;
          return (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {cls.name}
              </span>
              <span className="line-clamp-1 max-w-[320px] text-xs text-zinc-500 dark:text-zinc-400">
                {cls.description || "Chưa có mô tả chi tiết."}
              </span>
            </div>
          );
        },
      },
      {
        header: "Mã định danh",
        accessorKey: "code",
        cell: ({ row }) => (
          <span className="font-mono text-xs text-zinc-500">
            {row.original.code}
          </span>
        ),
      },
      {
        header: "Giảng viên phụ trách",
        accessorKey: "teacher",
        cell: ({ row }) => (
          <TeacherInfo teacher={row.original.teacher} />
        ),
      },
      {
        header: "Mã mời",
        accessorKey: "inviteCode",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-medium text-primary">
              {row.original.inviteCode || "---"}
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="text-zinc-400 hover:text-primary transition-colors"
                  onClick={() => {
                    if (row.original.inviteCode) {
                      navigator.clipboard.writeText(row.original.inviteCode);
                      toast.success("Đã sao chép mã mời");
                    }
                  }}
                >
                  <IconCopy size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Sao chép mã mời</TooltipContent>
            </Tooltip>
          </div>
        ),
      },
      {
        header: "Trạng thái",
        accessorKey: "isActive",
        cell: ({ row }) => {
          const isActive = row.original.isActive;
          return (
            <Badge variant={isActive ? "success" : "secondary"}>
              {isActive ? "Đang mở" : "Tạm dừng"}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right">Thao tác</div>,
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-lg text-zinc-400 hover:text-primary dark:hover:text-primary"
                  asChild
                >
                  <Link href={`/manage/classes/${row.original.id}`}>
                    <IconEye size={18} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-[10px] font-bold">
                Xem chi tiết
              </TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8 rounded-lg text-zinc-400">
                      <IconDotsVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-[10px] font-bold">
                  Tùy chọn khác
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  Thao tác lớp
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <IconPencil className="text-zinc-400" />
                  Chỉnh sửa lớp
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconCopy className="text-zinc-400" />
                  Sao chép mã mời
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <IconArchive />
                  Lưu trữ lớp học
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(pagination.totalRecords / pagination.limit),
    state: {
      pagination: {
        pageIndex: pagination.currentPage - 1,
        pageSize: pagination.limit,
      },
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="w-full overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="pt-2">
        <DataTablePagination
          table={table}
          totalItems={pagination.totalRecords}
          onPageChange={(page) => console.log("Page changed to:", page)}
          onPageSizeChange={(size) => console.log("Size changed to:", size)}
        />
      </div>
    </div>
  );
}
