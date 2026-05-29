"use client"

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

import {
  Sidebar,
  SidebarContent,
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
const suppliersRoute = "/manage/suppliers" as Route
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
      { label: "Nhà cung cấp", icon: Truck, href: suppliersRoute },
      { label: "Nhân sự", icon: Users, href: usersRoute },
      { label: "Cài đặt", icon: Settings },
    ],
  },
]

const menuButtonClass =
  "h-9 px-3 text-sm font-medium text-sidebar-foreground/70 hover:bg-white/8 hover:text-sidebar-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground [&_svg]:size-[18px]"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-0 py-5 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-3">
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

      <SidebarContent className="gap-4 px-3 py-4">
        {menuGroups.map((group) => (
          <MenuGroup key={group.label} group={group} pathname={pathname} />
        ))}
      </SidebarContent>

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
        width={80}
        height={60}
        className="mb-2 block h-14 w-20 object-contain"
        priority
      />

      <span className="text-lg leading-6 font-bold tracking-tight text-sidebar-foreground">
        CƠ KHÍ TIẾN HUY
      </span>

      <span className="mt-1 max-w-44 text-[9.5px] leading-4 font-semibold tracking-widest text-sidebar-foreground/40 uppercase">
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
    <SidebarGroup className="gap-1.5 p-0">
      <SidebarGroupLabel className="px-3 text-[10.5px] font-bold tracking-[0.12em] text-sidebar-foreground/40 uppercase">
        {group.label}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu className="gap-0.5">
          {group.items.map((item) => (
            <MenuButton key={item.label} item={item} pathname={pathname} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function MenuButton({ item, pathname }: { item: MenuItem; pathname: string }) {
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
