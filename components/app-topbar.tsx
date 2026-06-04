"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import * as React from "react"
import {
  Bell,
  ChevronDown,
  CircleHelp,
  LogOut,
  Menu,
  User,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"
import { logout } from "@/features/auth/actions/logout"
import { useAuth } from "@/features/auth/components/auth-provider"
import { getNameInitials } from "@/lib/string.util"
import { cn } from "@/lib/utils"

export type AppTopbarBreadcrumbItem = {
  label: string
  href?: string
}

type AppTopbarProps = {
  title?: string
  breadcrumbItems?: AppTopbarBreadcrumbItem[]
  breadcrumbs?: ReactNode
  actions?: ReactNode
  className?: string
}

export function AppTopbar({
  title,
  breadcrumbItems,
  breadcrumbs,
  actions,
  className,
}: AppTopbarProps) {
  const resolvedBreadcrumbs =
    breadcrumbs ||
    (breadcrumbItems?.length ? (
      <AppTopbarBreadcrumb items={breadcrumbItems} />
    ) : null)

  return (
    <header
      className={cn(
        "-mx-4 -mt-6 flex min-h-20 items-center justify-between gap-4 border-b border-border/70 bg-card px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-4">
        <TopbarSidebarTrigger />
        <div className="min-w-0">
          {title ? (
            <h1 className="truncate text-lg leading-6 font-bold text-foreground">
              {title}
            </h1>
          ) : null}
          {resolvedBreadcrumbs ? (
            <div className="mt-1.5 [&_[data-slot=breadcrumb-list]]:gap-2 [&_[data-slot=breadcrumb-list]]:text-xs">
              {resolvedBreadcrumbs}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {actions ? (
          <div className="flex flex-wrap items-center gap-3">{actions}</div>
        ) : null}
        <TopbarActions />
      </div>
    </header>
  )
}

function AppTopbarBreadcrumb({
  items,
}: {
  items: AppTopbarBreadcrumbItem[]
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="font-medium">
        {items.map((breadcrumbItem, index) => {
          const isLastItem = index === items.length - 1

          return (
            <React.Fragment key={`${breadcrumbItem.label}-${index}`}>
              <BreadcrumbItem>
                {breadcrumbItem.href && !isLastItem ? (
                  <BreadcrumbLink href={breadcrumbItem.href}>
                    {breadcrumbItem.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{breadcrumbItem.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLastItem ? <BreadcrumbSeparator /> : null}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function TopbarSidebarTrigger() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label="Mở hoặc thu gọn menu"
      className="size-8 shrink-0 text-primary hover:bg-primary/5 hover:text-primary"
      onClick={toggleSidebar}
    >
      <Menu className="size-5" />
    </Button>
  )
}

export function TopbarActions() {
  return (
    <div className="flex items-center gap-3">
      <NotificationButton />
      <HelpButton />
      <TopbarMenu />
    </div>
  )
}

function NotificationButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label="Thông báo"
      className="relative text-primary hover:bg-primary/5 hover:text-primary"
    >
      <Bell className="size-5" />
      <span className="absolute top-0 right-0 flex size-4 items-center justify-center rounded-full bg-destructive text-[9px] leading-none font-bold text-primary-foreground">
        5
      </span>
    </Button>
  )
}

function HelpButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label="Trợ giúp"
      className="text-primary hover:bg-primary/5 hover:text-primary"
    >
      <CircleHelp className="size-5" />
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
          className="h-11 gap-3 px-1.5 hover:bg-primary/5 sm:min-w-40 sm:justify-start sm:px-2"
          aria-label="Mở menu tài khoản"
        >
          <Avatar>
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="hidden min-w-0 text-left sm:block sm:flex-1">
            <p className="max-w-28 truncate text-xs leading-4 font-bold text-foreground">
              {displayName}
            </p>
            <p className="max-w-28 truncate text-[10px] leading-3 text-muted-foreground">
              {user.role}
            </p>
          </div>
          <ChevronDown className="hidden size-4 text-primary sm:block" />
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
        <DropdownMenuItem asChild>
          <Link href="/manage/profile">
            <User />
            <span>Hồ sơ cá nhân</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <User />
          <span>{user.role}</span>
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
