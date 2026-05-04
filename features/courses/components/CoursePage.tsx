"use client";

import type { PaginationInfo } from "@/types/api";
import type { Course } from "@/features/classes/types/course.type";
import { CourseGrid } from "./CourseGrid";
import { CourseHero } from "./CourseHero";
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
    <div className="space-y-10 pb-20">
      <CourseHero
        totalRecords={pagination.totalRecords}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />

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
