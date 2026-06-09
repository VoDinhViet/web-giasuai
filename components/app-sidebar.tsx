"use client"

import Link from "next/link"
import type { Route } from "next"
import { usePathname } from "next/navigation"
import {
  AlertTriangle,
  Bot,
  CalendarDays,
  ChartColumn,
  CircleDollarSign,
  DoorOpen,
  MonitorPlay,
  FileStack,
  FileText,
  FileQuestion,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  Route as RouteIcon,
  Settings,
  Sparkles,
  Users,
  Wifi,
  type LucideIcon,
} from "lucide-react"

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
import { useAuth } from "@/features/auth/components/auth-provider"
import type { PermissionInput } from "@/lib/auth/permission"
import { can } from "@/lib/auth/permission"

type MenuItem = {
  label: string
  icon: LucideIcon
  href?: string
  activePaths?: string[]
  exact?: boolean
  requiredPermission?: PermissionInput
}

type MenuGroup = {
  label: string
  items: MenuItem[]
}

const menuGroups: MenuGroup[] = [
  {
    label: "HOME",
    items: [
      { label: "Bảng điều khiển", icon: LayoutDashboard, href: "/manage", exact: true },
      { label: "Dashboard học viên", icon: Sparkles, href: "/manage/student-dashboard" },
      { label: "Vào học", icon: MonitorPlay, href: "/classes/CLS-001/courses/CRS-001/learn", activePaths: ["/classes"] },
      { label: "Tham gia lớp", icon: DoorOpen, href: "/manage/join-class" },
    ],
  },
  {
    label: "PAGES",
    items: [
      { label: "Quản lý lớp học", icon: GraduationCap, href: "/manage/classes" },
      {
        label: "Quản lý người dùng",
        icon: Users,
        href: "/manage/users",
        activePaths: ["/manage/users", "/manage/students", "/manage/profile"],
        requiredPermission: "users:read",
      },
      { label: "Quản lý khóa học", icon: FileText, href: "/manage/courses" },
      { label: "Thư viện học liệu", icon: FileStack, href: "/manage/library" },
    ],
  },
  {
    label: "ACADEMIC",
    items: [
      { label: "Lịch giảng dạy", icon: CalendarDays, href: "/manage/schedule" },
      { label: "Tracking điểm yếu", icon: AlertTriangle, href: "/manage/weaknesses" },
      { label: "Test đầu vào", icon: FileQuestion, href: "/manage/placement-tests" },
      { label: "Báo cáo tiến độ", icon: ChartColumn, href: "/manage/reports" },
    ],
  },
  {
    label: "AI TOOLS",
    items: [
      { label: "AI Assistant", icon: Bot, href: "/manage/ai-assistant" },
      { label: "Lộ trình AI", icon: RouteIcon, href: "/manage/learning-paths" },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { label: "Hỗ trợ", icon: LifeBuoy, href: "/manage/tickets" },
      { label: "AI quota", icon: CircleDollarSign, href: "/manage/ai-usage" },
      { label: "Tin tức & Blogs", icon: Wifi, href: "/manage/blogs" },
      { label: "Cài đặt", icon: Settings, href: "/manage/settings" },
    ],
  },
]

const menuButtonClass =
  "h-10 rounded-lg px-3 text-[13px] font-semibold text-sidebar-foreground/86 hover:bg-sidebar-accent hover:text-sidebar-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:shadow-[0_12px_24px_rgba(109,56,245,0.34)] [&_svg]:size-[17px]"

export function AppSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r-0">
      <SidebarHeader className="px-5 pt-7 pb-8 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              tooltip="Gia Sư AI"
              className="h-auto justify-start p-0 hover:bg-transparent data-[active=true]:bg-transparent"
            >
              <Link
                href={"/manage/users" as Route}
                className="flex min-w-0 items-center"
              >
                <SidebarBrand />
                <span className="hidden size-9 items-center justify-center rounded bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground group-data-[collapsible=icon]:flex">
                  AI
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-5 px-4 pb-5">
        {menuGroups.map((group) => (
          <MenuGroup
            key={group.label}
            group={group}
            pathname={pathname}
            user={user}
          />
        ))}
      </SidebarContent>

      <SidebarFooter className="px-4 py-4 group-data-[collapsible=icon]:hidden" />

      <SidebarRail />
    </Sidebar>
  )
}

function SidebarBrand() {
  return (
    <span className="flex min-w-0 items-center gap-3 group-data-[collapsible=icon]:hidden">
      <span className="flex size-10 shrink-0 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_10px_22px_rgba(124,58,237,0.35)]">
        <Sparkles className="size-5" />
      </span>

      <span className="min-w-0">
        <span className="block truncate text-sm leading-5 font-extrabold text-sidebar-foreground">
          Gia Sư AI
        </span>
        <span className="block truncate text-[8px] leading-3 font-bold tracking-[0.22em] text-sidebar-foreground/55 uppercase">
          Quản trị đào tạo
        </span>
      </span>
    </span>
  )
}

function MenuGroup({
  group,
  pathname,
  user,
}: {
  group: MenuGroup
  pathname: string
  user: ReturnType<typeof useAuth>["user"]
}) {
  const visibleItems = group.items.filter(
    (item) => can(user, item.requiredPermission)
  )

  if (visibleItems.length === 0) {
    return null
  }

  return (
    <SidebarGroup className="gap-1.5 p-0">
      <SidebarGroupLabel className="h-5 px-3 text-[9px] font-extrabold tracking-[0.14em] text-sidebar-foreground/34 uppercase">
        {group.label}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {visibleItems.map((item) => (
            <MenuButton key={item.label} item={item} pathname={pathname} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function MenuButton({ item, pathname }: { item: MenuItem; pathname: string }) {
  const Icon = item.icon
  const activePaths = item.activePaths ?? (item.href ? [item.href] : [])
  const isActive = item.exact
    ? activePaths.includes(pathname)
    : activePaths.some((activePath) => pathname === activePath || pathname.startsWith(`${activePath}/`))

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
          <Link href={item.href as Route}>
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
