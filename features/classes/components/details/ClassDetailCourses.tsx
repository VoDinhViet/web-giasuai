"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import {
  IconBook,
  IconChevronRight,
  IconCircleCheck,
  IconClock,
  IconPlus,
} from "@tabler/icons-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";

import { getClassCourses } from "../../actions/get-class-courses";
import type { Course } from "../../types/course.type";

// --- Constants ---

const COURSE_GRADIENTS = [
  "from-primary/80 to-indigo-600/80",
  "from-emerald-500/80 to-primary/80",
  "from-orange-500/80 to-rose-500/80",
  "from-violet-600/80 to-primary/80",
];

const ITEMS_PER_PAGE = 6;

// --- Helpers ---

const formatDuration = (minutes: number) => {
  if (!minutes) return "Chưa cập nhật";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${remainingMinutes} phút`;
  if (remainingMinutes === 0) return `${hours} giờ`;
  return `${hours} giờ ${remainingMinutes} phút`;
};

const getCourseDescription = (course: Course) =>
  course.shortDescription ||
  course.description ||
  "Khóa học chưa có mô tả chi tiết.";

// --- Sub-components ---

function CourseCardSkeleton() {
  return (
    <Card size="none" className="overflow-hidden border-none shadow-none">
      <AspectRatio ratio={16 / 9}>
        <Skeleton className="h-full w-full" />
      </AspectRatio>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
        <div className="flex justify-between pt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

function CourseCard({ course, gradient }: { course: Course; gradient: string }) {
  return (
    <Card size="none" className="group/card relative overflow-hidden border-none shadow-none transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary/5">
      <AspectRatio ratio={16 / 9} className="overflow-hidden">
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover/card:scale-110"
          />
        ) : (
          <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover/card:scale-110", gradient)} />
        )}
        
        {/* Overlays & Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 transition-opacity group-hover/card:opacity-80" />
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className="bg-white/20 backdrop-blur-md text-white border-none text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {course.level.replace("_", " ")}
          </Badge>
          {course.isPublished && (
            <Badge className="bg-emerald-500/90 text-white border-none text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Sẵn sàng
            </Badge>
          )}
        </div>

        {/* Play/Hover Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-500">
          <div className="size-12 rounded-full bg-white/90 dark:bg-zinc-900/90 shadow-2xl flex items-center justify-center text-primary scale-75 group-hover/card:scale-100 transition-transform duration-500">
            <IconChevronRight size={28} stroke={3} />
          </div>
        </div>
      </AspectRatio>

      <CardContent className="p-5 space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-base font-black text-zinc-900 dark:text-zinc-50 leading-tight group-hover/card:text-primary transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {getCourseDescription(course)}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <IconClock size={14} className="text-zinc-500" />
              <span className="text-[10px] font-bold uppercase tracking-tight">
                {formatDuration(course.estimatedDurationMinutes)}
              </span>
            </div>
            
            {course.isPublished ? (
              <div className="flex items-center gap-1.5 text-emerald-500">
                <IconCircleCheck size={14} />
                <span className="text-[10px] font-bold uppercase tracking-tight">Học ngay</span>
              </div>
            ) : (
              <Badge variant="secondary" className="h-5 rounded-md px-2 text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 uppercase tracking-tighter">
                Bản nháp
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Main Component ---

interface ClassDetailCoursesProps {
  classId: string;
}

export function ClassDetailCourses({ classId }: ClassDetailCoursesProps) {
  const [page, setPage] = useState(1);
  
  const { data, isLoading } = useSWR(
    ["class-detail-courses", classId, page],
    () => getClassCourses(classId, { limit: ITEMS_PER_PAGE, page }),
    { keepPreviousData: true }
  );

  // --- Rendering States ---

  const renderHeader = () => (
    <div className="flex items-center justify-between pb-2">
      <div className="space-y-1">
        <h3 className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          Chương trình giảng dạy
        </h3>
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Danh sách các khóa học đã được gán cho lớp học này.
        </p>
      </div>
      <Button asChild>
        <Link href={`/manage/classes/${classId}/courses/assign`}>
          <IconPlus className="mr-2 h-4 w-4" stroke={3} />
          Thêm khóa học
        </Link>
      </Button>
    </div>
  );

  if (isLoading && !data) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        {renderHeader()}
        <div className="grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const courses = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {renderHeader()}

      {courses.length === 0 ? (
        <EmptyState
          icon={IconBook}
          title="Chưa có khóa học"
          description="Lớp này hiện chưa có nội dung khóa học nào để hiển thị. Hãy bắt đầu bằng cách thêm khóa học đầu tiên!"
          className="rounded-[2.5rem] py-20 bg-zinc-50/50 dark:bg-zinc-900/20"
        />
      ) : (
        <div className="space-y-10">
          <div className={cn(
            "grid gap-6 sm:grid-cols-2 transition-opacity duration-300",
            isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
          )}>
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                gradient={COURSE_GRADIENTS[index % COURSE_GRADIENTS.length]}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center pt-8">
              <Pagination>
                <PaginationContent className="gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={cn(
                        "cursor-pointer rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
                        page === 1 && "pointer-events-none opacity-30"
                      )}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        onClick={() => setPage(p)}
                        isActive={page === p}
                        className={cn(
                          "cursor-pointer rounded-xl transition-all",
                          page === p ? "bg-primary text-white font-bold scale-110" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        )}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className={cn(
                        "cursor-pointer rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
                        page === totalPages && "pointer-events-none opacity-30"
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
