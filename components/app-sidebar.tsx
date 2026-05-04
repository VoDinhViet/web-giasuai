"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import {
  IconLayoutDashboard,
  IconUsers,
  IconSettings,
  IconLogout,
  IconCommand,
  IconChevronDown,
  IconMessageCircle,
  IconTicket,
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
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
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
    <SidebarMenu className="gap-1 px-2">
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
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.title}
                    className={cn(
                      "h-11 rounded-lg px-3.5 transition-all group",
                      isActive
                        ? "bg-primary! text-white! font-bold shadow-sm"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-primary dark:hover:text-zinc-100",
                    )}
                  >
                    <item.icon size={21} stroke={2} className="shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="ml-1 flex-1 text-[14px]">
                          {item.title}
                        </span>
                        <IconChevronDown
                          size={16}
                          className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                        />
                      </>
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="mt-1 gap-1 pl-6">
                    {item.children.map((subItem) => {
                      const isSubActive = isActivePath(subItem.url);
                      return (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={isSubActive}
                            className={cn(
                              "h-10 rounded-lg px-3 transition-all",
                              isSubActive
                                ? "bg-primary/10 font-bold text-primary dark:bg-zinc-800 dark:text-white"
                                : "text-zinc-500 hover:bg-zinc-50 hover:text-primary dark:text-zinc-500 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200",
                            )}
                          >
                            <Link
                              href={subItem.url}
                              className="flex items-center gap-3"
                            >
                              <div
                                className={cn(
                                  "size-1.5 rounded-full border-2 transition-all",
                                  isSubActive
                                    ? "border-primary bg-primary"
                                    : "border-zinc-300 dark:border-zinc-700",
                                )}
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
              className={cn(
                "h-11 rounded-lg px-3.5 transition-all group",
                isActive
                  ? "bg-primary! text-white! font-bold shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-primary dark:hover:text-zinc-100",
              )}
            >
              <Link href={item.url} className="flex items-center gap-3">
                <item.icon size={21} stroke={2} className="shrink-0" />
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
    <Sidebar
      collapsible="icon"
      className="border-r border-zinc-200/50 bg-sidebar shadow-none dark:border-zinc-800/50"
    >
      <SidebarHeader className="flex h-16 items-center px-4 py-4">
        <Link href="/manage" className="group flex items-center gap-2.5">
          <div className="relative flex aspect-square size-9 items-center justify-center overflow-hidden rounded-lg bg-white transition-transform group-hover:scale-105 border border-zinc-200/50 dark:border-zinc-800/50">
            <Image 
              src="/logo-new.png" 
              alt="Logo" 
              fill
              sizes="36px"
              className="p-1.5 object-contain" 
            />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-black leading-none tracking-tight text-zinc-950 dark:text-zinc-50">
              Gia Sư AI
            </span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-6 pb-6">
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
            <SidebarGroup key={group.label} className="p-0">
              {!isCollapsed && (
                <SidebarGroupLabel className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
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

      <SidebarFooter className="border-t border-zinc-100 p-4 dark:border-zinc-800/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-10 rounded-lg text-[13px] font-bold text-rose-500 transition-all hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10">
              <IconLogout size={20} stroke={2} />
              {!isCollapsed && <span>Đăng xuất</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
