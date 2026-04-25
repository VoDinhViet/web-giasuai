"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQueryStates } from "nuqs";

import { User } from "@/types/user";
import { PaginationInfo } from "@/types/api";
import { UserStatsGrid } from "./UserStatsGrid";
import { UserFilters } from "./UserFilters";
import { CreateUserDialog } from "./CreateUserDialog";
import { UserTable } from "./UserTable";
import { userTableColumns } from "./UserTableColumns";
import {
  usersSearchParams,
  type UsersSearch,
} from "../schemas/users-search-schema";

interface UserClientPageProps {
  users: User[];
  pagination: PaginationInfo;
}

export function UserClientPage({ users, pagination }: UserClientPageProps) {
  const [filters, setFilters] = useQueryStates(usersSearchParams, {
    shallow: false,
  });

  const handlePageChange = (page: number) => setFilters({ page });
  const handlePageSizeChange = (pageSize: number) =>
    setFilters({ limit: pageSize, page: 1 });
  const handleFiltersChange = (newFilters: Partial<UsersSearch>) =>
    setFilters({ ...newFilters, page: 1 });

  return (
    <div className="space-y-10">
      <UserStatsGrid />

      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-zinc-400">
              Quản lý người dùng
            </p>
            <h1 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
              Danh sách thành viên hệ thống
            </h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Theo dõi, lọc và quản lý quyền truy cập của toàn bộ tài khoản.
            </p>
          </div>

          <CreateUserDialog />
        </div>
        <Card>
          <CardContent className="space-y-6">
            <UserFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
            <UserTable
              data={users}
              columns={userTableColumns}
              meta={pagination}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
