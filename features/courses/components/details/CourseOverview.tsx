"use client";

import { IconCheck } from "@tabler/icons-react";
import type { Course } from "@/features/classes/types/course.type";

interface CourseOverviewProps {
  course: Course;
}

export function CourseOverview({ course }: CourseOverviewProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Course Description Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/95">
          Mô tả khóa học
        </h3>
        <div className="text-muted-foreground leading-relaxed text-sm font-medium pl-0.5">
          {course.description ? (
            <div dangerouslySetInnerHTML={{ __html: course.description }} className="prose prose-zinc dark:prose-invert max-w-none text-sm" />
          ) : (
            <p className="italic text-muted-foreground/60">
              Chưa có mô tả chi tiết cho khóa học này.
            </p>
          )}
        </div>
      </div>

      {/* Learning Outcomes Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/95">
          Giá trị nhận được
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 pl-0.5">
          {(course.learningOutcomes.length > 0
            ? course.learningOutcomes
            : [
              "Nắm vững kiến thức nền tảng",
              "Thực hành trên dự án thực tế",
              "Kỹ năng giải quyết vấn đề",
              "Tối ưu hóa hiệu năng",
              "Tư duy lập trình hiện đại",
            ]
          ).map((outcome, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 py-1"
            >
              <IconCheck size={16} className="text-emerald-500 shrink-0 mt-0.5 stroke-[2.5]" />
              <span className="text-sm font-medium text-muted-foreground leading-normal">
                {outcome}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
