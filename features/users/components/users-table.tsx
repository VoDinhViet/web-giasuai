"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useQueryStates } from "nuqs"

import { DataTable } from "@/components/data-table"
import type { Pagination } from "@/types/api"
import type { Role } from "@/types/user"
import { toggleUserStatus as toggleUserStatusServer } from "../actions/toggle-user-status"
import { usersSearchParams } from "../lib/search-params"
import type { User, UserStatus } from "../types"
import { createUsersTableColumns } from "./users-table-columns"
import { UsersTableFilter } from "./users-table-filter"

type UsersTableProps = {
  users: User[]
  roles: Role[]
  pagination: Pagination
}

export function UsersTable({ users, roles, pagination }: UsersTableProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [params, setParams] = useQueryStates(usersSearchParams, {
    shallow: false,
    startTransition,
  })

  console.log(users)

  async function handleToggleUserStatus(
    userId: string,
    currentStatus?: UserStatus
  ) {
    await toggleUserStatusServer(userId, currentStatus)
    router.refresh()
  }

  const columns = createUsersTableColumns({
    roles,
    onToggleUserStatus: handleToggleUserStatus,
  })

  return (
    <div
      className="min-w-0 overflow-hidden rounded-(--radius) border border-border/80 bg-card shadow-xs"
      aria-busy={isPending}
    >
      <UsersTableFilter
        roles={roles}
        filters={params}
        isLoading={isPending}
        onFiltersChange={(filters) => setParams({ ...filters, page: 1 })}
      />
      <DataTable
        columns={columns}
        rows={users}
        pagination={pagination}
        rowLabel="nhân viên"
        emptyTitle="Không có dữ liệu"
        emptyDescription="Thử thay đổi từ khóa tìm kiếm hoặc thêm nhân sự mới."
        isLoading={isPending}
        onPageChange={(page) => setParams({ page })}
        onPageSizeChange={(limit) => setParams({ limit, page: 1 })}
      />
    </div>
  )
}
