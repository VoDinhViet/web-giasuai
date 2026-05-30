'use client'

import { IconChevronRight } from '@tabler/icons-react'
import { useQueryStates } from 'nuqs'

import { Card, CardContent } from '@/components/ui/card'
import { User } from '@/types/user'
import { PaginationInfo } from '@/types/api'
import { UserStatsGrid } from './UserStatsGrid'
import { UserFilters } from './UserFilters'
import { CreateUserDialog } from './CreateUserDialog'
import { UserTable } from './UserTable'
import { userTableColumns } from './UserTableColumns'
import {
  usersSearchParams,
  type UsersSearch,
} from '../schemas/users-search-schema'

interface UserClientPageProps {
  users: User[]
  pagination: PaginationInfo
}

export function UserClientPage({ users, pagination }: UserClientPageProps) {
  const [filters, setFilters] = useQueryStates(usersSearchParams, {
    shallow: false,
  })

  const handlePageChange = (page: number) => setFilters({ page })
  const handlePageSizeChange = (pageSize: number) =>
    setFilters({ limit: pageSize, page: 1 })
  const handleFiltersChange = (newFilters: Partial<UsersSearch>) =>
    setFilters({ ...newFilters, page: 1 })

  return (
    <div className="space-y-8 text-foreground">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <nav className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Hệ thống</span>
            <IconChevronRight size={16} stroke={2.2} />
            <span className="text-foreground">Quản lý người dùng</span>
          </nav>

          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Danh sách người dùng
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Theo dõi tài khoản, vai trò và trạng thái truy cập trong hệ thống
            Gia Sư AI.
          </p>
        </div>

        <CreateUserDialog />
      </div>

      <UserStatsGrid users={users} totalUsers={pagination.totalRecords} />

      <Card size="none" className="rounded-xl">
        <CardContent className="p-0">
          <div className="border-b border-border/70 bg-muted/20 p-6">
            <UserFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>

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
  )
}
