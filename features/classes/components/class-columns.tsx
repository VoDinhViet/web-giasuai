"use client";

import React from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { IconCopy, IconDotsVertical, IconEye, IconPencil, IconArchive } from "@tabler/icons-react";
import { toast } from "sonner";

import { Class } from "@/types/class";
import { TeacherInfo } from "./TeacherInfo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
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

export const getClassColumns = (): ColumnDef<Class>[] => [
  {
    header: "Lớp học",
    accessorKey: "name",
    cell: ({ row }) => {
      const cls = row.original;
      return (
        <div className="flex flex-col py-1">
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {cls.name}
          </span>
          <span className="line-clamp-1 max-w-[300px] text-[11px] font-medium text-zinc-400 dark:text-zinc-500 italic">
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
      <span className="font-mono text-[11px] font-bold text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-100 dark:border-zinc-800">
        {row.original.code}
      </span>
    ),
  },
  {
    header: "Giảng viên phụ trách",
    accessorKey: "teacher",
    cell: ({ row }) => (
      <TeacherInfo teacher={row.original.teacher} size="md" />
    ),
  },
  {
    header: "Mã mời",
    accessorKey: "inviteCode",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm font-bold text-primary">
          {row.original.inviteCode || "---"}
        </span>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="text-zinc-300 hover:text-primary transition-colors p-1"
              onClick={() => {
                if (row.original.inviteCode) {
                  navigator.clipboard.writeText(row.original.inviteCode);
                  toast.success("Đã sao chép mã mời");
                }
              }}
            >
              <IconCopy size={14} stroke={2.5} />
            </button>
          </TooltipTrigger>
          <TooltipContent className="text-[10px] font-bold">Sao chép mã mời</TooltipContent>
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
        <Badge 
          variant={isActive ? "success" : "secondary"}
          className="rounded-md font-bold text-[10px] uppercase tracking-wider px-2 py-0.5"
        >
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
              size="icon-sm"
              className="size-8 rounded-lg text-zinc-400 hover:text-primary hover:bg-primary/5 transition-all"
              asChild
            >
              <Link href={`/manage/classes/${row.original.id}`}>
                <IconEye size={16} stroke={2.5} />
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
                <Button variant="ghost" size="icon-sm" className="size-8 rounded-lg text-zinc-400 hover:bg-zinc-100 transition-all">
                  <IconDotsVertical size={16} stroke={2.5} />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-[10px] font-bold">
              Tùy chọn khác
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end" className="w-48 rounded-xl border-zinc-200 shadow-none">
            <DropdownMenuLabel className="text-[10px] font-black uppercase text-zinc-400 tracking-widest px-3 py-2">
              Quản lý lớp học
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-100" />
            <DropdownMenuItem className="gap-2 text-sm font-medium py-2 px-3 focus:bg-zinc-50 cursor-pointer">
              <IconPencil size={16} className="text-zinc-400" stroke={2.5} />
              Chỉnh sửa lớp
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="gap-2 text-sm font-medium py-2 px-3 focus:bg-zinc-50 cursor-pointer"
              onClick={() => {
                if (row.original.inviteCode) {
                  navigator.clipboard.writeText(row.original.inviteCode);
                  toast.success("Đã sao chép mã mời");
                }
              }}
            >
              <IconCopy size={16} className="text-zinc-400" stroke={2.5} />
              Sao chép mã mời
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-100" />
            <DropdownMenuItem variant="destructive" className="gap-2 text-sm font-medium py-2 px-3 cursor-pointer">
              <IconArchive size={16} stroke={2.5} />
              Lưu trữ lớp học
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
