import Link from "next/link";
import type { Route } from "next";
import {
  IconArrowLeft,
  IconChevronRight,
  IconId,
  IconMail,
  IconShieldCheck,
  IconUser,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { User } from "@/types/user";
import { getInitials, getRoleLabel } from "../utils/user.util";

interface UserDetailPageProps {
  user: User;
}

export function UserDetailPage({ user }: UserDetailPageProps) {
  const displayName = user.fullName || user.username;
  const roleLabel = getRoleLabel(user.role);
  const initials = getInitials(displayName);
  const profileRows = [
    {
      icon: IconMail,
      label: "Email",
      value: user.email,
    },
    {
      icon: IconUser,
      label: "Tên đăng nhập",
      value: `@${user.username}`,
    },
    {
      icon: IconShieldCheck,
      label: "Vai trò",
      value: roleLabel,
    },
    {
      icon: IconId,
      label: "ID",
      value: user.id,
    },
  ];

  return (
    <div className="space-y-8 text-foreground">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <nav className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Hệ thống</span>
            <IconChevronRight size={16} stroke={2.2} />
            <span>Quản lý người dùng</span>
            <IconChevronRight size={16} stroke={2.2} />
            <span className="text-foreground">Hồ sơ</span>
          </nav>

          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {displayName}
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Thông tin tài khoản và trạng thái truy cập hiện tại.
          </p>
        </div>

        <Button variant="outline" asChild>
          <Link href={"/manage/users" as Route}>
            <IconArrowLeft />
            Danh sách người dùng
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <Card className="rounded-xl">
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                  alt={displayName}
                />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold leading-6">
                  {displayName}
                </h2>
                <p className="truncate text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{roleLabel}</Badge>
              <Badge
                variant="secondary"
                className={
                  user.isLocked
                    ? "bg-rose-50 text-rose-700 ring-1 ring-rose-100"
                    : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                }
              >
                {user.isLocked ? "Đã khóa" : "Đang hoạt động"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Chi tiết hồ sơ</CardTitle>
            <CardDescription>
              Dữ liệu định danh được trả về từ API người dùng.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {profileRows.map((row) => (
                <div
                  key={row.label}
                  className="flex min-w-0 items-center gap-3 rounded-lg border border-border/70 px-4 py-3"
                >
                  <row.icon className="size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {row.label}
                    </p>
                    <p className="truncate text-sm font-medium">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
