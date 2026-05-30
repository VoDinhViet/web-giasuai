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
import { AddStudentDialog } from "./AddStudentDialog";

interface ClassStudentsTableProps {
  classId: string;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 5;
const ALL_STATUS = "all";

const EMPTY_PAGINATION: PaginationInfo = {
  limit: DEFAULT_PAGE_SIZE,
  currentPage: DEFAULT_PAGE,
  nextPage: null,
  previousPage: null,
  totalRecords: 0,
  totalPages: 0,
};

const STUDENT_AVATAR_URL = "https://api.dicebear.com/7.x/avataaars/svg";

export function ClassStudentsTable({ classId }: ClassStudentsTableProps) {
  const { myUser } = useAuth();
  const canViewStudents =
    myUser?.role === UserRole.ADMIN || myUser?.role === UserRole.TEACHER;

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(DEFAULT_PAGE),
  );
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  );
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));
  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault(ALL_STATUS),
  );

  const swrKey = canViewStudents
    ? ["/api/v1/classes", classId, "students", page, pageSize, q, status]
    : null;

  const { data, isLoading, mutate } = useSWR(swrKey, () =>
    getClassStudents(classId, {
      page,
      limit: pageSize,
      q: q || undefined,
      status: status === ALL_STATUS ? undefined : status,
    }),
  );

  const paginationMeta = data?.pagination || EMPTY_PAGINATION;

  const pagination: PaginationState = {
    pageIndex: page - 1,
    pageSize,
  };

  const handlePaginationChange = (newPagination: PaginationState) => {
    setPage(newPagination.pageIndex + 1);
    setPageSize(newPagination.pageSize);
  };

  const handleFiltersChange = (filters: { q?: string; status?: string }) => {
    if (filters.q !== undefined) {
      setQ(filters.q);
    }

    if (filters.status !== undefined) {
      setStatus(filters.status);
    }

    setPage(DEFAULT_PAGE);
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
              <Avatar className="h-9 w-9 rounded-lg shadow-sm ring-1 ring-border/70">
                <AvatarImage src={`${STUDENT_AVATAR_URL}?seed=${student.id}`} />
                <AvatarFallback className="bg-primary/10 text-[10px] font-bold text-primary">
                  HS
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 space-y-0.5">
                <p className="truncate text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                  {student.fullName || "--"}
                </p>
                <p className="truncate text-[10px] font-medium text-muted-foreground">
                  @{student.username || "--"}
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
          <span className="text-xs font-medium text-muted-foreground">
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
            <Badge variant={isActive ? "success" : "secondary"}>
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
            <Button variant="ghost" size="icon">
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
            onFiltersChange={handleFiltersChange}
          >
            <AddStudentDialog classId={classId} onSuccess={() => mutate()} />
          </StudentFilters>
        }
      />
    </div>
  );
}
