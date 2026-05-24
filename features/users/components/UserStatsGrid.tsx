"use client";

import {
  IconLock,
  IconShieldCheck,
  IconUserCheck,
  IconUsersGroup,
} from "@tabler/icons-react";

import { Card, CardContent } from "@/components/ui/card";
import { User, UserRole } from "@/types/user";
import { cn } from "@/lib/utils";

interface UserStatsGridProps {
  users: User[];
  totalUsers: number;
}

export function UserStatsGrid({ users, totalUsers }: UserStatsGridProps) {
  const activeUsers = users.filter((user) => !user.isLocked).length;
  const lockedUsers = users.filter((user) => user.isLocked).length;
  const adminUsers = users.filter((user) => user.role === UserRole.ADMIN).length;

  const stats = [
    {
      title: "Tổng người dùng",
      value: totalUsers,
      icon: IconUsersGroup,
      accent: "text-primary",
      tile: "border-primary/10 bg-primary/5",
    },
    {
      title: "Đang hoạt động",
      value: activeUsers,
      icon: IconUserCheck,
      accent: "text-emerald-700",
      tile: "border-emerald-100 bg-emerald-50",
    },
    {
      title: "Đã khóa",
      value: lockedUsers,
      icon: IconLock,
      accent: "text-rose-700",
      tile: "border-rose-100 bg-rose-50",
    },
    {
      title: "Quản trị viên",
      value: adminUsers,
      icon: IconShieldCheck,
      accent: "text-sky-700",
      tile: "border-sky-100 bg-sky-50",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="rounded-xl">
          <CardContent className="flex items-center gap-5 px-6 py-4">
            <div
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-xl border",
                stat.tile,
              )}
            >
              <stat.icon size={24} stroke={2.4} className={stat.accent} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                {stat.title}
              </p>
              <p className="mt-1 text-2xl font-bold leading-none tracking-tight text-foreground">
                {stat.value.toLocaleString("vi-VN")}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
