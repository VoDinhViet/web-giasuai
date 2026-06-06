"use client"

import { useTransition } from "react"

import { Card } from "@/components/ui/card"
import type { Pagination } from "@/types/api"
import type { UserStats as UserStatsData } from "../actions/get-user-stats"
import type { User } from "../types"
import { UserStats } from "./user-stats"
import { UsersTable } from "./users-table"
import { UsersTableFilter } from "./users-table-filter"

type UsersPageProps = {
  users: User[]
  pagination: Pagination
  stats: UserStatsData
}

export function UsersPage({ users, pagination, stats }: UsersPageProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex w-full flex-col gap-5">
      <UserStats stats={stats} />
      <Card className="min-w-0 gap-0 py-0">
        <UsersTableFilter
          isPending={isPending}
          startTransition={startTransition}
        />
        <UsersTable
          users={users}
          pagination={pagination}
          isPending={isPending}
          startTransition={startTransition}
        />
      </Card>
    </div>
  )
}
