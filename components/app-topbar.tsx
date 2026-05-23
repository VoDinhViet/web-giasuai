"use client"

import { Bell, CircleHelp, Search } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAuth } from "@/features/auth/components/auth-provider"

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

  if (!user) {
    return null
  }

  const displayName = user.fullName || user.email
  const avatarFallback = getAvatarFallback(displayName)

  return (
    <div className="hidden items-center gap-3 sm:flex">
      <div className="text-right">
        <p className="max-w-40 truncate text-sm font-medium leading-none">
          {displayName}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{user.role.name}</p>
      </div>
      <Avatar>
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
    </div>
  )
}

function getAvatarFallback(displayName: string) {
  return displayName
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((namePart) => namePart[0])
    .join("")
    .toUpperCase()
}
