"use client";

import { IconBookUpload } from "@tabler/icons-react";

import { EmptyState } from "@/components/shared/EmptyState";
import type { PaginationInfo } from "@/types/api";
import type { Course } from "@/features/classes/types/course.type";
import { CourseCard } from "./CourseCard";
import { CourseSectionTitle } from "./CourseSectionTitle";
import { CoursesPagination } from "./CoursesPagination";

interface CourseGridProps {
  courses: Course[];
  pagination: PaginationInfo;
  gradients: string[];
}

export function CourseGrid({
  courses,
  pagination,
  gradients,
}: CourseGridProps) {
  if (!courses.length) {
    return (
      <EmptyState
        icon={IconBookUpload}
        title={"Kho khóa học trống"}
        description={
          "Hiện chưa có khóa học nào trong hệ thống để giáo viên chọn và đưa vào lớp học."
        }
        className="rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800"
      />
    );
  }

  return (
    <section className="space-y-6">
      <CourseSectionTitle />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5">
        {courses.map((course, index) => (
          <CourseCard
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
