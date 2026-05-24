"use client";

import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import {
  IconLayoutDashboard,
  IconUsers,
  IconSettings,
  IconChevronDown,
  IconMessageCircle,
  IconBrandOpenai,
  IconChartBar,
  IconCalendarEvent,
  IconDatabase,
  IconSchool,
  IconFileText,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuth } from "@/components/providers/auth-provider";
import { canAccessAny } from "@/lib/rbac";
import type { AppPermission, UserRole } from "@/types/user";

interface NavItem<T extends string = string> {
  title: string;
  url: T;
  icon: React.ElementType;
  permissions?: AppPermission[];
  children?: NavChildItem<T>[];
}

interface NavChildItem<T extends string = string> {
  title: string;
  url: T;
  permissions?: AppPermission[];
}

const NAV_GROUPS: Array<{
  label: string;
  items: NavItem<Route>[];
}> = [
  {
    label: "HOME",
    items: [
      {
        title: "Bảng điều khiển",
        url: "/manage",
        icon: IconLayoutDashboard,
      },
    ],
  },
  {
    label: "PAGES",
    items: [
      {
        title: "Quản lý lớp học",
        url: "/manage/classes",
        icon: IconSchool,
        permissions: ["classes.read"],
      },
      {
        title: "Quản lý khóa học",
        url: "/manage/courses",
        icon: IconFileText,
        permissions: ["courses.delete"],
      },
      {
        title: "Quản lý người dùng",
        url: "/manage/users",
        icon: IconUsers,
        permissions: ["users.read"],
      },
      {
        title: "Thư viện học liệu",
        url: "/manage/resources",
        icon: IconDatabase,
      },
    ],
  },
  {
    label: "ACADEMIC",
    items: [
      {
        title: "Lịch giảng dạy",
        url: "/manage/schedule",
        icon: IconCalendarEvent,
      },
      {
        title: "Báo cáo tiến độ",
        url: "/manage/reports",
        icon: IconChartBar,
      },
    ],
  },
  {
    label: "AI TOOLS",
    items: [
      {
        title: "AI Assistant",
        url: "/manage/ai/assistant",
        icon: IconBrandOpenai,
      },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      {
        title: "Tin tức & Blogs",
        url: "/manage/blogs",
        icon: IconMessageCircle,
      },
      {
        title: "Cài đặt",
        url: "/manage/settings",
        icon: IconSettings,
      },
    ],
  },
];

function filterNavItems<T extends string>(
  items: NavItem<T>[],
  role: UserRole | undefined,
  permissions?: AppPermission[],
) {
  return items
    .map((item): NavItem<T> | null => {
      const visibleByPermission =
        !item.permissions ||
        canAccessAny(role, permissions, item.permissions);

      if (!visibleByPermission) {
        return null;
      }

      const children = item.children?.filter((child) => {
        if (!child.permissions) {
          return true;
        }

        return canAccessAny(role, permissions, child.permissions);
      });

      if (item.children && !children?.length) {
        return null;
      }

      return {
        ...item,
        children,
      } as NavItem<T>;
    })
    .filter((item): item is NavItem<T> => item !== null);
}

const NavMenu = ({
  items,
  pathname,
  isCollapsed,
}: {
  items: NavItem<Route>[];
  pathname: string;
  isCollapsed: boolean;
}) => {
  const isActivePath = (targetUrl: string) => {
    if (targetUrl === "/manage") return pathname === "/manage";
    return pathname === targetUrl || pathname.startsWith(`${targetUrl}/`);
  };

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive =
          isActivePath(item.url) ||
          item.children?.some((c) => isActivePath(c.url));

        if (item.children) {
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.title}
                  >
                    <item.icon size={21} stroke={2} />
                    {!isCollapsed && (
                      <>
                        <span className="ml-1 flex-1 text-[14px]">
                          {item.title}
                        </span>
                        <IconChevronDown
                          size={16}
                        />
                      </>
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu>
                    {item.children.map((subItem) => {
                      const isSubActive = isActivePath(subItem.url);
                      return (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={isSubActive}
                          >
                              <Link href={subItem.url}>
                              <div
                                className={
                                  isSubActive
                                    ? "size-1.5 rounded-full border-2 border-primary bg-primary transition-all"
                                    : "size-1.5 rounded-full border-2 border-sidebar-foreground/30 transition-all"
                                }
                              />
                              <span className="text-[13px]">
                                {subItem.title}
                              </span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        }

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              tooltip={item.title}
            >
              <Link href={item.url}>
                <item.icon size={21} stroke={2} />
                {!isCollapsed && <span className="ml-1 text-[14px]">{item.title}</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { myUser } = useAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          href="/manage"
          className={
            isCollapsed
              ? "flex items-center justify-center"
              : "flex min-w-0 items-center gap-3 rounded-lg px-2 py-1.5"
          }
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-primary text-primary-foreground shadow-sm shadow-primary/25">
            <IconBrandOpenai size={22} stroke={2.2} />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <div className="truncate text-[15px] font-black leading-tight text-white">
                Gia Sư AI
              </div>
              <div className="truncate text-[11px] font-bold uppercase tracking-widest text-sidebar-foreground/45">
                Quản trị đào tạo
              </div>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {NAV_GROUPS.map((group) => {
          const items = filterNavItems(
            group.items,
            myUser?.role,
            myUser?.permissions,
          );

          if (!items.length) {
            return null;
          }

          return (
            <SidebarGroup key={group.label}>
              {!isCollapsed && (
                <SidebarGroupLabel>
                  {group.label}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <NavMenu
                  items={items}
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
