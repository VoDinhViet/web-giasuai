"use client";

import { IconBookUpload } from "@tabler/icons-react";

import { EmptyState } from "@/components/shared/EmptyState";
import type { PaginationInfo } from "@/types/api";
import type { Course } from "@/features/classes/types/course.type";
import { CourseLibraryCard } from "./CourseLibraryCard";
import { CoursesLibrarySectionTitle } from "./CoursesLibrarySectionTitle";
import { CoursesPagination } from "./CoursesPagination";

interface CoursesLibraryGridProps {
  courses: Course[];
  pagination: PaginationInfo;
  gradients: string[];
}

export function CoursesLibraryGrid({
  courses,
  pagination,
  gradients,
}: CoursesLibraryGridProps) {
  if (!courses.length) {
    return (
      <EmptyState
        icon={IconBookUpload}
        title={"Kho khóa học trống"}
        description={
          "Hiện chưa có khóa học nào trong hệ thống để giáo viên chọn và đưa vào lớp học."
        }
        className="rounded-[2rem] border border-dashed border-zinc-200 dark:border-zinc-800"
      />
    );
  }

  return (
    <section className="space-y-6">
      <CoursesLibrarySectionTitle />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {courses.map((course, index) => (
          <CourseLibraryCard
            key={course.id}
            course={course}
            gradient={gradients[index % gradients.length]}
          />
        ))}
      </div>

      <CoursesPagination pagination={pagination} />
    </section>
  );
}
