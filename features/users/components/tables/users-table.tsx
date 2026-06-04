"use client"

import { useTransition } from "react"
import type { Route } from "next"
import { useRouter } from "next/navigation"
import { useQueryStates } from "nuqs"

import { DataTable } from "@/components/shared/data-table"
import type { Pagination } from "@/types/api"
import { toggleUserStatus as toggleUserStatusServer } from "../../actions/toggle-user-status"
import { usersSearchParams } from "../../lib/search-params"
import type { User } from "../../types"
import { createUsersTableColumns } from "./users-table-columns"
import { UsersTableFilter } from "./users-table-filter"

type UsersTableProps = {
  users: User[]
  pagination: Pagination
}

export function UsersTable({ users, pagination }: UsersTableProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [params, setParams] = useQueryStates(usersSearchParams, {
    shallow: false,
    startTransition,
  })

  async function handleToggleUserStatus(userId: string) {
    await toggleUserStatusServer(userId)
    router.refresh()
  }

  function handleViewUser(userId: string) {
    router.push(`/manage/users/${userId}` as Route)
  }

  const columns = createUsersTableColumns({
    onToggleUserStatus: handleToggleUserStatus,
  })

  return (
    <div
      className="min-w-0 overflow-hidden rounded-(--radius) border border-border/80 bg-card shadow-xs"
      aria-busy={isPending}
    >
      <UsersTableFilter
        filters={params}
        isLoading={isPending}
        onFiltersChange={(filters) => setParams({ ...filters, page: 1 })}
      />
      <DataTable
        columns={columns}
        rows={users}
        pagination={pagination}
        isLoading={isPending}
        rowLabel="người dùng"
        tableClassName="min-w-240"
        onPageChange={(page) => setParams({ page })}
        onPageSizeChange={(limit) => setParams({ limit, page: 1 })}
        onRowClick={(user) => handleViewUser(user.id)}
      />
    </div>
  )
}
