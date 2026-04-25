"use client";

import {
  IconCircleCheck,
  IconLock,
  IconShieldCheck,
  IconUsers,
} from "@tabler/icons-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function UserStatsGrid() {
  const stats = [
    {
      title: "Tổng người dùng",
      value: 1234,
      sub: "Toàn bộ tài khoản trong hệ thống",
      color: "text-sky-700 dark:text-sky-300",
      bg: "bg-sky-500/12 ring-sky-500/20",
      icon: IconUsers,
    },
    {
      title: "Đang hoạt động",
      value: 1100,
      sub: "Tài khoản có thể đăng nhập và sử dụng",
      color: "text-emerald-700 dark:text-emerald-300",
      bg: "bg-emerald-500/12 ring-emerald-500/20",
      icon: IconCircleCheck,
    },
    {
      title: "Bị khóa",
      value: 34,
      sub: "Tài khoản tạm ngưng truy cập",
      color: "text-rose-700 dark:text-rose-300",
      bg: "bg-rose-500/12 ring-rose-500/20",
      icon: IconLock,
    },
    {
      title: "Quản trị viên",
      value: 5,
      sub: "Tài khoản có quyền quản trị",
      color: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-500/12 ring-amber-500/20",
      icon: IconShieldCheck,
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <div className="space-y-2">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
                  {stat.value.toLocaleString()}
                </h3>
              </div>

              <CardAction
                className={cn("shrink-0 rounded-2xl p-3 ring-1", stat.bg)}
              >
                <stat.icon size={22} className={stat.color} />
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-semibold leading-5 text-zinc-500 dark:text-zinc-400">
                {stat.sub}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
