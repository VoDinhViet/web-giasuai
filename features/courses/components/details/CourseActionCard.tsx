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
    : (`/manage/courses/${course.id}?tab=curriculum` as Route);

  return (
    <div className="space-y-4">
      <Card size="none" className="overflow-hidden">
        <CoursePreview course={course} />

        <CardContent className="space-y-5 !p-4">
          <CourseActions
            courseId={course.id}
            firstLessonId={firstLessonId}
            learnHref={learnHref}
          />
          <CourseIncludes totalLessons={totalLessons} />
        </CardContent>
      </Card>

      {!course.isPublished ? <DraftCourseNotice /> : null}
    </div>
  );
}

interface CoursePreviewProps {
  course: Course;
}

function CoursePreview({ course }: CoursePreviewProps) {
  return (
    <div className="relative overflow-hidden">
      <AspectRatio ratio={16 / 9} className="overflow-hidden">
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
            <IconBook2 size={40} className="opacity-40" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="flex size-11 items-center justify-center rounded-full border border-white/25 bg-white/20 text-white backdrop-blur-xs">
            <IconPlayerPlay size={18} fill="currentColor" />
          </div>
        </div>
      </AspectRatio>

      <div className="absolute left-3 top-3 z-10">
        <Badge size="xs">Xem giới thiệu</Badge>
      </div>
    </div>
  );
}

interface CourseActionsProps {
  courseId: string;
  firstLessonId?: string;
  learnHref: Route;
}

function CourseActions({
  courseId,
  firstLessonId,
  learnHref,
}: CourseActionsProps) {
  return (
    <div className="space-y-2">
      <Button size="lg" className="w-full" asChild>
        <Link href={learnHref}>
          <IconPlayerPlay size={16} fill="currentColor" />
          {firstLessonId ? "Vào học ngay" : "Xem chương trình học"}
        </Link>
      </Button>

      <PermissionGuard role={UserRole.TEACHER}>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/manage/courses/${courseId}/assign`}>
            <IconPlus size={14} />
            Thêm vào lớp học
          </Link>
        </Button>
      </PermissionGuard>
    </div>
  );
}

interface CourseIncludesProps {
  totalLessons?: number;
}

function CourseIncludes({ totalLessons }: CourseIncludesProps) {
  const features = getCourseFeatures(totalLessons);

  return (
    <div className="space-y-3 border-t border-border/50 pt-3">
      <h5 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Bao gồm trong khóa học
      </h5>
      <div className="space-y-2">
        {features.map((feature) => (
          <div
            key={feature.label}
            className="flex items-center gap-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <div className="shrink-0 text-primary/75">{feature.icon}</div>
            <span className="font-medium text-foreground/80">{feature.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DraftCourseNotice() {
  return (
    <Card className="space-y-3 p-5">
      <div className="flex items-center gap-3 text-amber-700 dark:text-amber-500">
        <div className="flex size-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
          <IconHelpCircle size={18} />
        </div>
        <h4 className="text-sm font-bold">Trạng thái bản nháp</h4>
      </div>
      <p className="text-[12px] leading-relaxed text-amber-700/70 dark:text-amber-500/70">
        Khóa học này đang ở trạng thái bản nháp. Bạn cần hoàn thiện các bài học
        trước khi xuất bản.
      </p>
      <Button variant="outline" className="w-full">
        Xuất bản ngay
      </Button>
    </Card>
  );
}

function getCourseFeatures(totalLessons?: number) {
  return [
    {
      icon: <IconPlayerPlay size={15} />,
      label: "Truy cập trọn đời",
    },
    {
      icon: <IconBook2 size={15} />,
      label: totalLessons ? `${totalLessons} bài học chi tiết` : "9 bài học chi tiết",
    },
    {
      icon: <IconFileText size={15} />,
      label: "Tài liệu đính kèm",
    },
    {
      icon: <IconHelpCircle size={15} />,
      label: "Hỗ trợ 24/7",
    },
  ];
}
