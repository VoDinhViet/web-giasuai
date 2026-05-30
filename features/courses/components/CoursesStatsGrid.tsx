"use client";

import {
  IconBook2,
  IconCircleCheck,
  IconLayoutGrid,
  IconPhoto,
  type TablerIcon,
} from "@tabler/icons-react";

import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card";
import type { Course } from "@/features/classes/types/course.type";

interface CoursesStatsGridProps {
  courses: Course[];
  totalRecords: number;
}

interface CourseStatItem {
  title: string;
  value: number;
  sub: string;
  icon: TablerIcon;
}

export function CoursesStatsGrid({
  courses,
  totalRecords,
}: CoursesStatsGridProps) {
  const publishedCount = courses.filter((course) => course.isPublished).length;
  const thumbnailCount = courses.filter(
    (course) => !!course.thumbnailUrl,
  ).length;

  const stats: CourseStatItem[] = [
    {
      title: "Tổng mục trong kho",
      value: totalRecords,
      sub: "Tổng số khóa học có thể được giáo viên duyệt và chọn",
      icon: IconBook2,
    },
    {
      title: "Đang mở trên kệ",
      value: courses.length,
      sub: "Số khóa học đang hiển thị ở lượt xem hiện tại",
      icon: IconLayoutGrid,
    },
    {
      title: "Sẵn sàng gắn lớp",
      value: publishedCount,
      sub: "Khóa học đã xuất bản và phù hợp để thêm vào lớp",
      icon: IconCircleCheck,
    },
    {
      title: "Có ảnh bìa",
      value: thumbnailCount,
      sub: "Khóa học có thumbnail giúp giáo viên nhận diện nhanh",
      icon: IconPhoto,
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} >
            <CardHeader>
              <div className="min-w-0 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-black tracking-tight text-foreground">
                  {stat.value.toLocaleString("vi-VN")}
                </h3>
              </div>

              <CardAction className="shrink-0 rounded-xl border border-border/70 bg-muted/40 p-3 text-primary">
                <stat.icon size={22} />
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-medium leading-5 text-muted-foreground">
                {stat.sub}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
