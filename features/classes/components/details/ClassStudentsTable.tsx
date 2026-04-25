"use client";

import React from "react";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import useSWR from "swr";

import { useAuth } from "@/components/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/DataTable";
import type { PaginationInfo } from "@/types/api";
import { UserRole, type User } from "@/types/user";
import { getClassStudents } from "../../actions/get-class-students";
import { StudentFilters } from "./StudentFilters";

interface ClassStudentsTableProps {
  classId: string;
}

const EMPTY_PAGINATION: PaginationInfo = {
  limit: 5,
  currentPage: 1,
  nextPage: null,
  previousPage: null,
  totalRecords: 0,
  totalPages: 0,
};

export function ClassStudentsTable({ classId }: ClassStudentsTableProps) {
  const { myUser } = useAuth();
  const canViewStudents =
    myUser?.role === UserRole.ADMIN || myUser?.role === UserRole.TEACHER;

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(5),
  );
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));
  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault("all"),
  );

  const swrKey = canViewStudents
    ? ["/api/v1/classes", classId, "students", page, pageSize, q, status]
    : null;

  const { data, isLoading } = useSWR(swrKey, async () => {
    return await getClassStudents(classId, {
      page,
      limit: pageSize,
      q: q || undefined,
      status: status === "all" ? undefined : status,
    } as {
      page: number;
      limit: number;
      q?: string;
      status?: string;
    });
  });

  const paginationMeta = data?.pagination || EMPTY_PAGINATION;

  const pagination: PaginationState = {
    pageIndex: page - 1,
    pageSize,
  };

  const handlePaginationChange = (newPagination: PaginationState) => {
    setPage(newPagination.pageIndex + 1);
    setPageSize(newPagination.pageSize);
  };

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "fullName",
        header: "Học viên",
        cell: ({ row }) => {
          const student = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 rounded-lg shadow-sm ring-1 ring-zinc-100 dark:ring-zinc-800">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.id}`}
                />
                <AvatarFallback className="bg-primary/10 text-[10px] font-bold text-primary">
                  HS
                </AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-zinc-900 transition-colors group-hover:text-primary dark:text-zinc-50">
                  {student.fullName}
                </p>
                <p className="text-[10px] font-medium text-zinc-400">
                  @{student.username}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ getValue }) => (
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => {
          const isActive = !row.original.isLocked;
          return (
            <Badge
              variant={isActive ? "success" : "secondary"}
              className="rounded-md border-none px-2 py-0.5 text-[9px] font-bold uppercase"
            >
              {isActive ? "Đang hoạt động" : "Tạm khóa"}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: () => (
          <div className="text-right">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md transition-all hover:bg-primary/10 hover:text-primary"
            >
              <IconDotsVertical size={16} />
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  if (!canViewStudents) {
    return null;
  }

  return (
    <div className="animate-in slide-in-from-bottom-2 fade-in duration-500">
      <DataTable
        columns={columns}
        data={data?.data || []}
        totalCount={paginationMeta.totalRecords}
        pageCount={Math.max(paginationMeta.totalPages, 1)}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        loading={isLoading}
        hideBorder
        hideBackground
        toolbar={
          <StudentFilters
            q={q}
            status={status}
            onFiltersChange={(filters) => {
              if (filters.q !== undefined) {
                setQ(filters.q);
              }
              if (filters.status !== undefined) {
                setStatus(filters.status);
              }
              setPage(1);
            }}
          />
        }
      />
    </div>
  );
}
