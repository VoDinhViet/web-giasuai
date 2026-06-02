"use client";

import { IconCheck } from "@tabler/icons-react";
import type { Course } from "@/features/classes/types/course.type";

interface CourseOverviewProps {
  course: Course;
}

export function CourseOverview({ course }: CourseOverviewProps) {
  return (
    <div className="animate-in space-y-8 fade-in duration-300">
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
          Mô tả khóa học
        </h3>
        <div className="max-w-3xl text-sm font-medium leading-7 text-muted-foreground">
          {course.description ? (
            <div
              dangerouslySetInnerHTML={{ __html: course.description }}
              className="prose prose-zinc max-w-none text-sm leading-7 dark:prose-invert"
            />
          ) : (
            <p className="italic text-muted-foreground/60">
              Chưa có mô tả chi tiết cho khóa học này.
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
          Giá trị nhận được
        </h3>

        <div className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
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
              className="flex items-start gap-3"
            >
              <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <IconCheck size={13} className="stroke-[3]" />
              </div>
              <span className="text-sm font-medium leading-6 text-muted-foreground">
                {outcome}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
