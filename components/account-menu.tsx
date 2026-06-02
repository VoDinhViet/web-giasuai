'use client'

import Link from 'next/link'
import {
  IconBell,
  IconHelp,
  IconLogout,
  IconSettings,
  IconShieldCheck,
  IconUser,
} from '@tabler/icons-react'
import { useAuth } from '@/components/providers/auth-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/features/auth/actions/logout'
import { getInitials, getRoleLabel } from '@/features/users/utils/user.util'

export function AccountMenu() {
  const { myUser } = useAuth()
  const initials = getInitials(myUser?.fullName)
  const roleLabel = getRoleLabel(myUser?.role)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="lg">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="hidden min-w-0 flex-col items-start text-left md:flex">
            <span className="max-w-36 truncate text-[13px] font-semibold leading-none">
              {myUser?.fullName || '-'}
            </span>
            <span className="mt-1 max-w-36 truncate text-[10px] font-medium text-muted-foreground">
              {roleLabel}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage src="" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col gap-1">
              <p className="truncate text-sm font-semibold leading-tight">
                {myUser?.fullName || '-'}
              </p>
              <p className="truncate text-xs font-normal text-muted-foreground">
                {myUser?.email}
              </p>
              <div>
                <Badge variant="secondary">
                  <IconShieldCheck size={12} />
                  {roleLabel}
                </Badge>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/manage/profile">
            <IconUser size={16} />
            <span>Hồ sơ cá nhân</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconSettings size={16} />
          <span>Cài đặt hệ thống</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconBell size={16} />
          <span>Thông báo</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <IconHelp size={16} />
          <span>Hỗ trợ & Trợ giúp</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={() => logout()}>
          <IconLogout size={16} />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
