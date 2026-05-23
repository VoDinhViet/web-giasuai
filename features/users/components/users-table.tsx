"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { DataTable } from "@/components/data-table"
import type { Pagination } from "@/types/api"
import { toggleUserStatus as toggleUserStatusServer } from "../actions/toggle-user-status"
import type { User } from "../types"
import { createUsersTableColumns } from "./users-table-columns"
import { UsersTableFilter } from "./users-table-filter"
import { useUsersSearchParams } from "../lib/use-users-search-params"

type UsersTableProps = {
  users: User[]
  pagination: Pagination
}

export function UsersTable({
  users,
  pagination,
}: UsersTableProps) {
  const router = useRouter()
  const { setCurrentPage } = useUsersSearchParams()

  const handleToggleUserStatus = React.useCallback(
    async (userId: string, currentStatus?: string) => {
      await toggleUserStatusServer(userId, currentStatus)
      router.refresh()
    },
    [router]
  )

  const columns = React.useMemo(
    () => createUsersTableColumns({ onToggleUserStatus: handleToggleUserStatus }),
    [handleToggleUserStatus]
  )

  return (
    <DataTable
      columns={columns}
      rows={users}
      pagination={pagination}
      rowLabel="nhân viên"
      emptyTitle="Không có dữ liệu"
      emptyDescription="Thử thay đổi từ khóa tìm kiếm hoặc thêm nhân sự mới."
      onPageChange={setCurrentPage}
      toolbar={<UsersTableFilter />}
    />
  )
}
