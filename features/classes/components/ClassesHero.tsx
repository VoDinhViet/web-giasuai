"use client";

import React from "react";
import {
  IconBook2,
  IconClockPause,
  IconSchool,
  IconUsers,
} from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { ClassStatistics } from "@/types/class";

interface ClassesHeroProps {
  statistics: ClassStatistics;
}

interface StatCard {
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentClassName: string;
  iconWrapClassName: string;
}

export function ClassesHero({ statistics }: ClassesHeroProps) {
  const stats: StatCard[] = [
    {
      label: "Tổng số lớp",
      value: statistics.totalClasses.toString(),
      sub: "Toàn bộ lớp học trong hệ thống",
      icon: IconSchool,
      accentClassName: "text-sky-700 dark:text-sky-300",
      iconWrapClassName: "bg-sky-500/12 ring-sky-500/20",
    },
    {
      label: "Đang hoạt động",
      value: statistics.activeClasses.toString(),
      sub: "Lớp đang mở và có thể vận hành",
      icon: IconBook2,
      accentClassName: "text-emerald-700 dark:text-emerald-300",
      iconWrapClassName: "bg-emerald-500/12 ring-emerald-500/20",
    },
    {
      label: "Tạm dừng",
      value: statistics.pausedClasses.toString(),
      sub: "Lớp đang ở trạng thái tạm dừng",
      icon: IconClockPause,
      accentClassName: "text-amber-700 dark:text-amber-300",
      iconWrapClassName: "bg-amber-500/12 ring-amber-500/20",
    },
    {
      label: "Tổng học viên",
      value: statistics.totalStudents.toString(),
      sub: "Tổng học viên trên tất cả lớp học",
      icon: IconUsers,
      accentClassName: "text-fuchsia-700 dark:text-fuchsia-300",
      iconWrapClassName: "bg-fuchsia-500/12 ring-fuchsia-500/20",
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.label}>
            <CardContent>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-4">
                  <div className="space-y-2">
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
                      {item.label}
                    </p>
                    <p className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
                      {item.value}
                    </p>
                  </div>
                  <p className="text-xs font-semibold leading-5 text-zinc-500 dark:text-zinc-400">
                    {item.sub}
                  </p>
                </div>

                <div
                  className={`shrink-0 rounded-2xl p-3 ring-1 ${item.iconWrapClassName}`}
                >
                  <item.icon size={22} className={item.accentClassName} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
