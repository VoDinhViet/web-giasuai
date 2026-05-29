"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Route } from "next"
import { usePathname } from "next/navigation"
import {
  Blocks,
  ClipboardList,
  Factory,
  FileText,
  ListChecks,
  LogOut,
  PackageSearch,
  ReceiptText,
  Settings,
  ShoppingCart,
  Truck,
  UserRound,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { logout } from "@/features/auth/actions/logout"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

type MenuItem = {
  label: string
  icon: LucideIcon
  href?: Route
}

type MenuGroup = {
  label: string
  items: MenuItem[]
}

const clientsRoute = "/manage/clients" as Route
const usersRoute = "/manage/users" as Route

const menuGroups: MenuGroup[] = [
  {
    label: "Quản lý bán hàng",
    items: [
      { label: "Đơn hàng", icon: ShoppingCart },
      { label: "Giao hàng", icon: Truck },
    ],
  },
  {
    label: "Quản lý sản xuất",
    items: [
      { label: "Lệnh sản xuất", icon: Factory },
      { label: "Công đoạn sản xuất", icon: Blocks },
      { label: "BOM & Kiểm tồn", icon: ListChecks },
      { label: "Gia công ngoài", icon: Warehouse },
      { label: "Lệnh vật tư", icon: ClipboardList },
    ],
  },
  {
    label: "Quản lý mua hàng",
    items: [
      { label: "Đề xuất mua hàng", icon: FileText },
      { label: "Danh mục mua hàng", icon: ReceiptText },
    ],
  },
  {
    label: "Hệ thống",
    items: [
      { label: "Sản phẩm", icon: PackageSearch },
      { label: "Khách hàng", icon: UserRound, href: clientsRoute },
      { label: "Nhân sự", icon: Users, href: usersRoute },
      { label: "Cài đặt", icon: Settings },
    ],
  },
]

const menuButtonClass =
  "h-10 px-3 text-base text-sidebar-foreground/70 hover:bg-white/8 hover:text-sidebar-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground [&_svg]:size-5"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-0 py-8 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              tooltip="Cơ khí Tiến Huy"
              className="h-auto justify-center p-0 hover:bg-transparent data-[active=true]:bg-transparent"
            >
              <Link href={clientsRoute} className="flex justify-center">
                <SidebarBrand />
                <span className="hidden size-10 items-center justify-center rounded bg-sidebar-accent text-sm font-bold text-sidebar-accent-foreground group-data-[collapsible=icon]:flex">
                  TH
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-6 px-4">
        {menuGroups.map((group) => (
          <MenuGroup key={group.label} group={group} pathname={pathname} />
        ))}
      </SidebarContent>

      <LogoutButton />
      <SidebarRail />
    </Sidebar>
  )
}

function SidebarBrand() {
  return (
    <span className="flex flex-col items-center text-center group-data-[collapsible=icon]:hidden">
      <Image
        src="/tien-huy-logo-mark.png"
        alt="Cơ khí Tiến Huy"
        width={104}
        height={80}
        className="mb-3 block h-20 w-26 object-contain"
        priority
      />

      <span className="text-[23px] font-extrabold leading-7 tracking-[-0.01em] text-sidebar-foreground">
        CƠ KHÍ TIẾN HUY
      </span>

      <span className="mt-2 max-w-48 text-[11px] font-bold uppercase leading-5 tracking-[0.24em] text-sidebar-foreground/45">
        Hệ thống quản trị doanh nghiệp
      </span>
    </span>
  )
}

function MenuGroup({
  group,
  pathname,
}: {
  group: MenuGroup
  pathname: string
}) {
  return (
    <SidebarGroup className="gap-4 p-0">
      <SidebarGroupLabel className="px-3 text-xs font-bold uppercase tracking-[0.16em] text-sidebar-foreground/35">
        {group.label}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          {group.items.map((item) => (
            <MenuButton key={item.label} item={item} pathname={pathname} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function MenuButton({
  item,
  pathname,
}: {
  item: MenuItem
  pathname: string
}) {
  const Icon = item.icon
  const isActive = item.href === pathname

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={item.label}
        asChild={Boolean(item.href)}
        isActive={isActive}
        className={menuButtonClass}
        type={item.href ? undefined : "button"}
      >
        {item.href ? (
          <Link href={item.href}>
            <Icon />
            <span>{item.label}</span>
          </Link>
        ) : (
          <>
            <Icon />
            <span>{item.label}</span>
          </>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function LogoutButton() {
  const [isPending, startTransition] = React.useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logout()
    })
  }

  return (
    <SidebarFooter className="border-t border-sidebar-border px-4 py-6 group-data-[collapsible=icon]:p-2">
      <Button
        disabled={isPending}
        onClick={handleLogout}
        className="h-12 w-full gap-2 border border-red-500/20 bg-red-500/10 px-3 text-sm font-semibold text-red-400 transition-all duration-200 hover:bg-red-600 hover:text-white disabled:opacity-50 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
      >
        <LogOut className="size-5 shrink-0" />
        <span className="group-data-[collapsible=icon]:hidden">
          {isPending ? "Đang đăng xuất..." : "Đăng xuất"}
        </span>
      </Button>
    </SidebarFooter>
  )
}
