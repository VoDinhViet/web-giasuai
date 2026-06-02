"use client";

import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import type { PaginationInfo } from "@/types/api";
import type { Course } from "@/features/classes/types/course.type";
import { canAccess } from "@/lib/rbac";
import { CourseGrid } from "./CourseGrid";
import { CoursesStatsGrid } from "./CoursesStatsGrid";

interface CoursePageProps {
  courses: Course[];
  pagination: PaginationInfo;
}


export function CoursePage({
  courses,
  pagination,
}: CoursePageProps) {
  const { myUser } = useAuth();
  const canCreateCourse = canAccess(
    myUser?.role,
    myUser?.permissions,
    "courses.create",
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Kho khóa học
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Quản lý nội dung khóa học dùng để gán vào lớp học và phục vụ học tập.
          </p>
        </div>

        {canCreateCourse ? (
          <Button asChild className="w-full md:w-auto">
            <Link href="/manage/courses/create">
              <IconPlus className="mr-2 h-4 w-4" />
              Tạo khóa học
            </Link>
          </Button>
        ) : null}
      </div>

      <CoursesStatsGrid
        courses={courses}
        totalRecords={pagination.totalRecords}
      />

      <CourseGrid
        courses={courses}
        pagination={pagination}
      />
    </div>
  );
}
