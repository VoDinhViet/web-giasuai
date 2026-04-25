"use client";

import {
  IconBook2,
  IconCircleCheck,
  IconLayoutGrid,
  IconPhoto,
} from "@tabler/icons-react";

import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card";
import type { Course } from "@/features/classes/types/course.type";
import { cn } from "@/lib/utils";

interface CoursesStatsGridProps {
  courses: Course[];
  totalRecords: number;
}

export function CoursesStatsGrid({
  courses,
  totalRecords,
}: CoursesStatsGridProps) {
  const publishedCount = courses.filter((course) => course.isPublished).length;
  const thumbnailCount = courses.filter((course) => !!course.thumbnailUrl).length;

  const stats = [
    {
      title: "Tổng mục trong kho",
      value: totalRecords,
      sub: "Tổng số khóa học có thể được giáo viên duyệt và chọn",
      color: "text-sky-700 dark:text-sky-300",
      bg: "bg-sky-500/12 ring-sky-500/20",
      icon: IconBook2,
    },
    {
      title: "Đang mở trên kệ",
      value: courses.length,
      sub: "Số khóa học đang hiển thị ở lượt xem hiện tại",
      color: "text-indigo-700 dark:text-indigo-300",
      bg: "bg-indigo-500/12 ring-indigo-500/20",
      icon: IconLayoutGrid,
    },
    {
      title: "Sẵn sàng gắn lớp",
      value: publishedCount,
      sub: "Khóa học đã xuất bản và phù hợp để thêm vào lớp",
      color: "text-emerald-700 dark:text-emerald-300",
      bg: "bg-emerald-500/12 ring-emerald-500/20",
      icon: IconCircleCheck,
    },
    {
      title: "Có ảnh bìa",
      value: thumbnailCount,
      sub: "Khóa học có thumbnail giúp giáo viên nhận diện nhanh",
      color: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-500/12 ring-amber-500/20",
      icon: IconPhoto,
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <div className="space-y-2">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
                  {stat.value.toLocaleString("vi-VN")}
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
