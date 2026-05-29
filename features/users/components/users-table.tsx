"use client"

import { useRouter } from "next/navigation"
import { useQueryStates } from "nuqs"

import { DataTable } from "@/components/data-table"
import type { Pagination } from "@/types/api"
import { toggleUserStatus as toggleUserStatusServer } from "../actions/toggle-user-status"
import { usersSearchParams } from "../lib/search-params"
import type { User } from "../types"
import { createUsersTableColumns } from "./users-table-columns"
import { UsersTableFilter } from "./users-table-filter"

type UsersTableProps = {
  users: User[]
  pagination: Pagination
}

export function UsersTable({ users, pagination }: UsersTableProps) {
  const router = useRouter()
  const [, setParams] = useQueryStates(usersSearchParams)

  async function handleToggleUserStatus(
    userId: string,
    currentStatus?: string
  ) {
    await toggleUserStatusServer(userId, currentStatus)
    router.refresh()
  }

  const columns = createUsersTableColumns({
    onToggleUserStatus: handleToggleUserStatus,
  })

  return (
    <DataTable
      columns={columns}
      rows={users}
      pagination={pagination}
      rowLabel="nhân viên"
      emptyTitle="Không có dữ liệu"
      emptyDescription="Thử thay đổi từ khóa tìm kiếm hoặc thêm nhân sự mới."
      onPageChange={(page) => setParams({ page })}
      onPageSizeChange={(limit) => setParams({ limit, page: 1 })}
      toolbar={<UsersTableFilter />}
    />
  )
}
