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

const COURSE_GRADIENTS = [
  "from-sky-600/85 to-cyan-500/85",
  "from-indigo-600/85 to-violet-500/85",
  "from-emerald-600/85 to-teal-500/85",
  "from-orange-500/85 to-rose-500/85",
];

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
        gradients={COURSE_GRADIENTS}
      />
    </div>
  );
}
