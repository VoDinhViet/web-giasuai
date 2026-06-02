import { IconChevronRight, IconId, IconMail, IconUser } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { User } from "@/types/user";
import { getInitials, getRoleLabel } from "../utils/user.util";
import { CurrentUserProfileForm } from "./CurrentUserProfileForm";

interface CurrentUserProfilePageProps {
  user: User;
}

export function CurrentUserProfilePage({ user }: CurrentUserProfilePageProps) {
  const displayName = user.fullName || user.username;
  const roleLabel = getRoleLabel(user.role);
  const initials = getInitials(displayName);

  return (
    <div className="space-y-8 text-foreground">
      <div className="space-y-1">
        <nav className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>Tài khoản</span>
          <IconChevronRight size={16} stroke={2.2} />
          <span className="text-foreground">Hồ sơ cá nhân</span>
        </nav>

        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Hồ sơ cá nhân
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Quản lý thông tin hiển thị của tài khoản trong hệ thống Gia Sư AI.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
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
                  @{user.username}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg border border-border/70 px-3 py-2.5">
                <IconMail className="size-4 text-muted-foreground" />
                <span className="min-w-0 truncate text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border/70 px-3 py-2.5">
                <IconUser className="size-4 text-muted-foreground" />
                <span className="text-sm">{roleLabel}</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border/70 px-3 py-2.5">
                <IconId className="size-4 text-muted-foreground" />
                <span className="min-w-0 truncate text-sm">{user.id}</span>
              </div>
            </div>

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
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
            <CardDescription>
              Các trường định danh được quản lý bởi hệ thống xác thực.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrentUserProfileForm user={user} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
