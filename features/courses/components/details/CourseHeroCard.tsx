"use client";

import type { ReactNode } from "react";
import { IconClock, IconStar, IconUsers } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Course } from "@/features/classes/types/course.type";

interface CourseHeroCardProps {
  course: Course;
}

export function CourseHeroCard({ course }: CourseHeroCardProps) {
  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <div className="space-y-6">
          <CourseBadges course={course} />
          <CourseSummary course={course} />
          <CourseMetaGrid />
        </div>
      </CardContent>
    </Card>
  );
}

function CourseBadges({ course }: CourseHeroCardProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="secondary" size="xs">
        Học liệu AI
      </Badge>
      <Badge variant={course.isPublished ? "success" : "secondary"} size="xs">
        {course.isPublished ? "Đã xuất bản" : "Bản nháp"}
      </Badge>
      {course.tags.map((tag) => (
        <Badge key={tag} variant="default" size="xs">
          #{tag}
        </Badge>
      ))}
    </div>
  );
}

function CourseSummary({ course }: CourseHeroCardProps) {
  return (
    <div className="space-y-3">
      <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-[2rem]">
        {course.title}
      </h1>
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
        {course.description ||
          "Khóa học chuyên sâu giúp bạn làm chủ các kỹ năng cần thiết một cách bài bản và thực tế nhất."}
      </p>
    </div>
  );
}

function CourseMetaGrid() {
  return (
    <div className="grid gap-3 border-t border-border/70 pt-5 sm:grid-cols-3">
      <CourseMetaItem
        icon={<IconStar size={16} fill="currentColor" className="text-amber-500" />}
        label="Đánh giá"
        value="4.8 / 5.0"
      />
      <CourseMetaItem icon={<IconUsers size={16} />} label="Học viên" value="1,240" />
      <CourseMetaItem icon={<IconClock size={16} />} label="Lộ trình học" value="Tự do" />
    </div>
  );
}

interface CourseMetaItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function CourseMetaItem({ icon, label, value }: CourseMetaItemProps) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div className="min-w-0">
        <p className="font-semibold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
