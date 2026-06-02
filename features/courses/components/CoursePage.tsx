"use client";

import type { PaginationInfo } from "@/types/api";
import type { Course } from "@/features/classes/types/course.type";
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
  return (
    <div className="space-y-8 pb-20">
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
