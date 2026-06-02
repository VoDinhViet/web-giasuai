"use client"

import * as React from "react"
import {
  Bell,
  ChevronDown,
  CircleHelp,
  LogOut,
  Search,
  User,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { logout } from "@/features/auth/actions/logout"
import { useAuth } from "@/features/auth/components/auth-provider"
import { getNameInitials } from "@/lib/string.util"

export function AppTopbar() {
  return (
    <div className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-card/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <SidebarTrigger className="md:hidden" />
      <TopbarSearch />
      <TopbarActions />
    </div>
  )
}

function TopbarSearch() {
  return (
    <div className="relative hidden w-full max-w-md sm:block">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        aria-label="Tìm kiếm toàn hệ thống"
        placeholder="Tìm kiếm nhân viên, mã ID..."
        className="pl-9"
      />
    </div>
  )
}

function TopbarActions() {
  return (
    <div className="ml-auto flex items-center gap-2">
      <NotificationButton />
      <HelpButton />
      <Separator orientation="vertical" className="mx-2 hidden h-8 sm:block" />
      <TopbarMenu />
    </div>
  )
}

function NotificationButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Thông báo"
      className="relative"
    >
      <Bell />
      <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-destructive" />
    </Button>
  )
}

function HelpButton() {
  return (
    <Button type="button" variant="ghost" size="icon" aria-label="Trợ giúp">
      <CircleHelp />
    </Button>
  )
}

function TopbarMenu() {
  const { user } = useAuth()
  const [isPending, startTransition] = React.useTransition()

  if (!user) {
    return null
  }

  const displayName = user.fullName || user.email
  const avatarFallback = getNameInitials(displayName)

  function handleLogout() {
    startTransition(async () => {
      await logout()
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-11 gap-3 px-2.5 sm:min-w-44 sm:justify-between sm:px-3"
          aria-label="Mở menu tài khoản"
        >
          <div className="hidden min-w-0 text-right sm:block sm:flex-1">
            <p className="max-w-40 truncate text-sm leading-none font-medium">
              {displayName}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {user.role.name}
            </p>
          </div>
          <Avatar>
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-64">
        <DropdownMenuLabel className="flex items-center gap-3 p-2">
          <Avatar size="lg">
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <span className="min-w-0">
            <span className="block truncate font-medium">{displayName}</span>
            <span className="block truncate text-xs font-normal text-muted-foreground">
              {user.email}
            </span>
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <User />
          <span>{user.role.name}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer data-highlighted:bg-destructive/10 data-highlighted:text-destructive data-highlighted:[&_svg]:text-destructive"
          disabled={isPending}
          onSelect={handleLogout}
        >
          <LogOut />
          <span>{isPending ? "Đang đăng xuất..." : "Đăng xuất"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
