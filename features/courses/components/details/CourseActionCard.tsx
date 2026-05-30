"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import {
  IconBook2,
  IconFileText,
  IconHelpCircle,
  IconPlayerPlay,
  IconPlus,
} from "@tabler/icons-react";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Course } from "@/features/classes/types/course.type";
import { UserRole } from "@/types/user";

interface CourseActionCardProps {
  course: Course;
  totalLessons?: number;
  firstLessonId?: string;
}

export function CourseActionCard({
  course,
  totalLessons,
  firstLessonId,
}: CourseActionCardProps) {
  const learnHref = firstLessonId
    ? (`/courses/${course.id}/learn/${firstLessonId}` as Route)
    : (`/courses/${course.id}?tab=curriculum` as Route);

  return (
    <div className="space-y-4">
      <Card size="none" className="overflow-hidden">
        <div className="overflow-hidden relative">
          <AspectRatio ratio={16 / 9} className="overflow-hidden">
            {course.thumbnailUrl ? (
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-102"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                <IconBook2 size={40} className="opacity-40" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer">
              <div className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/20 text-white backdrop-blur-xs transition-transform duration-300 scale-95 group-hover:scale-100 shadow-sm">
                <IconPlayerPlay size={18} fill="currentColor" />
              </div>
            </div>
          </AspectRatio>
          
          <div className="absolute left-3 top-3 z-10">
            <Badge className="border-none bg-black/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-xs rounded-md">
              Xem giới thiệu
            </Badge>
          </div>
        </div>

        <CardContent className="space-y-5 !p-4 ">
          <div className="space-y-2">
            <Button size="lg" className="w-full" asChild>
              <Link href={learnHref}>
                <IconPlayerPlay size={16} fill="currentColor" />
                {firstLessonId ? "Vào học ngay" : "Xem chương trình học"}
              </Link>
            </Button>

            <PermissionGuard role={UserRole.TEACHER}>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/manage/courses/${course.id}/assign`}>
                  <IconPlus size={14} />
                  {"Thêm vào lớp học"}
                </Link>
              </Button>
            </PermissionGuard>
          </div>

          <div className="space-y-3 pt-3 border-t border-border/40">
            <h5 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/85">
              Bao gồm trong khóa học
            </h5>
            <div className="space-y-2">
              {[
                {
                  icon: <IconPlayerPlay size={15} />,
                  label: "Truy cập trọn đời",
                },
                { icon: <IconBook2 size={15} />, label: totalLessons ? `${totalLessons} bài học chi tiết` : "9 bài học chi tiết" },
                {
                  icon: <IconFileText size={15} />,
                  label: "Tài liệu đính kèm",
                },
                { icon: <IconHelpCircle size={15} />, label: "Hỗ trợ 24/7" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-xs text-muted-foreground font-medium py-0.5"
                >
                  <div className="text-primary/70 shrink-0">
                    {feature.icon}
                  </div>
                  <span className="text-foreground/80 font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {!course.isPublished ? (
        <Card className="space-y-3 border-amber-200/70 bg-amber-50/50 p-5 dark:bg-amber-900/5">
          <div className="flex items-center gap-3 text-amber-700 dark:text-amber-500">
            <div className="flex size-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <IconHelpCircle size={18} />
            </div>
            <h4 className="text-sm font-bold">Trạng thái bản nháp</h4>
          </div>
          <p className="text-[12px] leading-relaxed text-amber-700/70 dark:text-amber-500/70">
            Khóa học này đang ở trạng thái bản nháp. Bạn cần hoàn thiện các bài
            học trước khi xuất bản.
          </p>
          <Button
            variant="outline"
            className="w-full border-amber-200/60 bg-white text-amber-700 hover:bg-amber-50 dark:bg-zinc-950"
          >
            Xuất bản ngay
          </Button>
        </Card>
      ) : null}
    </div>
  );
}
