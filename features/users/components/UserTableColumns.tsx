'use client'

import { createColumnHelper } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/types/user'
import { Badge } from '@/components/ui/badge'
import { UserTableActions } from './UserTableActions'
import { cn } from '@/lib/utils'

const columnHelper = createColumnHelper<User>()

export const userTableColumns = [
  columnHelper.accessor('fullName', {
    header: () => (
      <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
        Người dùng
      </span>
    ),
    cell: (info) => (
      <div className="flex items-center gap-3 py-1">
        <Avatar className="size-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border-0">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${info.row.original.username}`}
            className="grayscale opacity-80 hover:grayscale-0 transition-all duration-300"
          />
          <AvatarFallback className="bg-primary/10 text-primary font-bold">
            {(info.getValue() || info.row.original.username)
              .charAt(0)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-bold text-zinc-950 dark:text-zinc-100 font-heading leading-tight">
            {info.getValue() || info.row.original.username}
          </p>
          <p className="text-[12px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">
            @{info.row.original.username}
          </p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('email', {
    header: () => (
      <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
        Liên hệ
      </span>
    ),
    cell: (info) => (
      <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('role', {
    header: () => (
      <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
        Vai trò
      </span>
    ),
    cell: (info) => {
      const role = info.getValue()
      const roleMap: Record<
        string,
        {
          label: string
          variant:
            | 'default'
            | 'secondary'
            | 'destructive'
            | 'outline'
            | 'success'
            | 'warning'
            | 'info'
        }
      > = {
        ADMIN: {
          label: 'Quản trị viên',
          variant: 'default',
        },
        TEACHER: {
          label: 'Giáo viên',
          variant: 'info',
        },
        STUDENT: {
          label: 'Học viên',
          variant: 'secondary',
        },
      }

      const normalizedRole = role.toUpperCase()
      const config = roleMap[normalizedRole] || {
        label: role,
        variant: 'secondary',
      }

      return <Badge variant={config.variant}>{config.label}</Badge>
    },
  }),
  columnHelper.accessor('isLocked', {
    header: () => (
      <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
        Trạng thái
      </span>
    ),
    cell: (info) => {
      const isLocked = info.getValue()
      return (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              isLocked ? 'bg-rose-500' : 'bg-emerald-500',
            )}
          />
          <span
            className={cn(
              'text-[13px] font-bold',
              isLocked
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-emerald-600 dark:text-emerald-400',
            )}
          >
            {isLocked ? 'Bị khóa' : 'Hoạt động'}
          </span>
        </div>
      )
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: () => (
      <div className="text-right text-[11px] font-bold uppercase tracking-widest text-zinc-400">
        Hành động
      </div>
    ),
    cell: (info) => (
      <div className="flex justify-end">
        <UserTableActions myUser={info.row.original} />
      </div>
    ),
  }),
]
