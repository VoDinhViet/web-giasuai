"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconCircleCheck,
  IconClock,
  IconPlus,
  IconSparkles,
} from "@tabler/icons-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Course } from "@/features/classes/types/course.type";
import { cn } from "@/lib/utils";

interface CourseLibraryCardProps {
  course: Course;
  gradient: string;
}

const formatDuration = (minutes: number) => {
  if (!minutes) return "Chưa cập nhật";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (!hours) return `${remainingMinutes} phút`;
  if (!remainingMinutes) return `${hours} giờ`;
  return `${hours} giờ ${remainingMinutes} phút`;
};

export function CourseLibraryCard({
  course,
  gradient,
}: CourseLibraryCardProps) {
  const summary =
    course.shortDescription ||
    course.description ||
    "Khóa học chưa có mô tả ngắn.";

  return (
    <Card
      variant="flat"
      size="none"
      className="h-full flex flex-col group/card transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail Section */}
      <div className="relative w-full overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          {course.thumbnailUrl ? (
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover brightness-[0.82] transition-all duration-700 group-hover/card:scale-105 group-hover/card:brightness-100"
            />
          ) : (
            <div
              className={cn(
                "absolute inset-0 bg-linear-to-br transition-transform duration-700 group-hover/card:scale-105",
                gradient,
              )}
            />
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />

          {/* Badges Overlay */}
          <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
            <Badge className="border-none bg-white/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md">
              {course.level.replaceAll("_", " ")}
            </Badge>
            <Badge
              className={cn(
                "border-none px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white",
                course.isPublished ? "bg-emerald-500/90" : "bg-zinc-900/70",
              )}
            >
              {course.isPublished ? "Đã xuất bản" : "Bản nháp"}
            </Badge>
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="flex items-end justify-between gap-3">
              <div className="space-y-1 text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                  Kho nội dung
                </p>
                <p className="line-clamp-2 text-lg font-black leading-tight">
                  {course.title}
                </p>
              </div>
              <CardAction className="static">
                <div className="rounded-full bg-white/10 p-2 text-white backdrop-blur-md ring-1 ring-white/20">
                  <IconSparkles size={16} />
                </div>
              </CardAction>
            </div>
          </div>
        </AspectRatio>
      </div>

      {/* Body Section */}
      <CardContent className="p-5 flex flex-col grow space-y-4">
        {/* Upper Content: Description & Tags */}
        <div className="space-y-4">
          <p className="line-clamp-2 text-sm font-medium leading-6 text-zinc-500 dark:text-zinc-400">
            {summary}
          </p>

          <div className="flex flex-wrap gap-2">
            {course.tags.length > 0 ? (
              course.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full px-2.5 py-1 text-[10px] font-bold"
                >
                  #{tag}
                </Badge>
              ))
            ) : (
              <Badge
                variant="secondary"
                className="rounded-full px-2.5 py-1 text-[10px] font-bold"
              >
                Chưa gắn tag
              </Badge>
            )}
          </div>
        </div>

        {/* Lower Content: Stats & Suggestions (Pushed to bottom) */}
        <div className="mt-auto space-y-4 pt-2">
          <Separator className="bg-zinc-100 dark:bg-zinc-800" />

          <div className="grid grid-cols-2 gap-3">
            <StatBox
              label="Thời lượng"
              value={formatDuration(course.estimatedDurationMinutes)}
              icon={<IconClock size={14} />}
            />
            <StatBox
              label="Sử dụng"
              value={
                course.isPublished ? "Có thể thêm vào lớp" : "Chờ hoàn thiện"
              }
              icon={
                <IconCircleCheck
                  size={14}
                  className={
                    course.isPublished ? "text-emerald-500" : "text-zinc-400"
                  }
                />
              }
            />
          </div>

          <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/70 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
              Gợi ý dùng nhanh
            </p>
            <p className="mt-2 text-xs font-semibold leading-5 text-zinc-500 dark:text-zinc-400">
              Mở chi tiết để xem nội dung hoặc chuyển ngay sang khu vực lớp học
              để gắn khóa này.
            </p>
          </div>
        </div>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="grid gap-2 px-5 pt-0 pb-5 sm:grid-cols-2">
        <Button asChild variant="outline" className="h-10 rounded-xl font-bold">
          <Link href={`/manage/courses/${course.id}`}>
            Xem chi tiết
            <IconArrowRight size={15} className="ml-2" />
          </Link>
        </Button>
        <Button
          asChild
          className="h-10 rounded-xl font-bold shadow-lg shadow-primary/20"
        >
          <Link href={`/manage/courses/${course.id}/assign`}>
            <IconPlus size={15} className="mr-2" />
            Thêm vào lớp
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function StatBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-zinc-50 px-3 py-3 dark:bg-zinc-900/70 border border-zinc-100/50 dark:border-zinc-800/50 shadow-xs">
      <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
        {label}
      </p>
      <div className="mt-2 flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
        {icon}
        <span className="text-xs font-bold truncate">{value}</span>
      </div>
    </div>
  );
}
