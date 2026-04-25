"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconBook2,
  IconFileText,
  IconHelpCircle,
  IconPlayerPlay,
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
}

export function CourseActionCard({ course }: CourseActionCardProps) {
  return (
    <div className="space-y-8">
      <Card size="none">
        <div className="overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            {course.thumbnailUrl ? (
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary to-primary/60 text-white">
                <IconBook2 size={48} className="opacity-30" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <div className="flex size-16 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-all group-hover:scale-100 scale-90">
                <IconPlayerPlay size={28} fill="currentColor" />
              </div>
            </div>
          </AspectRatio>
        </div>

        <div className="absolute left-5 top-5">
          <Badge className="border-white/20 bg-black/40 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
            Xem giới thiệu
          </Badge>
        </div>

        <CardContent className="space-y-8 p-8 pt-4">
          <div className="space-y-3">
            <Button size="lg" className="w-full shadow-lg shadow-primary/20" asChild>
              <Link href={`/courses/${course.id}/learn/1`}>
                <IconPlayerPlay size={18} fill="currentColor" className="mr-2" />
                Vào học ngay
              </Link>
            </Button>

            <PermissionGuard role={UserRole.TEACHER}>
              <Button size="lg" className="w-full" variant="secondary" asChild>
                <Link href={`/manage/courses/${course.id}/assign`}>
                  Gán vào lớp học
                  <IconArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </PermissionGuard>

            <Button size="lg" className="w-full" variant="outline" asChild>
              <Link href={`/manage/courses/${course.id}`}>
                Chỉnh sửa khóa học
              </Link>
            </Button>
          </div>

          <div className="space-y-5">
            <h5 className="border-b border-border/40 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
              Bao gồm trong khóa học
            </h5>
            <div className="space-y-4">
              {[
                {
                  icon: <IconPlayerPlay size={18} />,
                  label: "Truy cập trọn đời",
                },
                { icon: <IconBook2 size={18} />, label: "9 bài học chi tiết" },
                {
                  icon: <IconFileText size={18} />,
                  label: "Tài liệu đính kèm",
                },
                { icon: <IconHelpCircle size={18} />, label: "Hỗ trợ 24/7" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group flex cursor-default items-center gap-4 text-[14px] font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  <div className="text-primary/40 transition-colors group-hover:text-primary">
                    {feature.icon}
                  </div>
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {!course.isPublished ? (
        <Card className="space-y-3 rounded-[1.5rem] border border-amber-200/50 bg-amber-50/50 p-6 dark:bg-amber-900/5">
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
            size="sm"
            variant="outline"
            className="h-10 w-full rounded-xl border-amber-200/60 bg-white text-xs font-black uppercase tracking-widest text-amber-700 transition-all hover:bg-amber-50 dark:bg-zinc-950"
          >
            Xuất bản ngay
          </Button>
        </Card>
      ) : null}
    </div>
  );
}
