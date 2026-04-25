"use client";

import { IconCheck } from "@tabler/icons-react";
import { Item, ItemContent, ItemMedia, ItemTitle } from "./item";
import type { Course } from "@/features/classes/types/course.type";

interface CourseOverviewProps {
  course: Course;
}

export function CourseOverview({ course }: CourseOverviewProps) {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Course Description Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-5 w-1 bg-primary rounded-full" />
          <h3 className="text-sm font-black capitalize tracking-[0.15em] text-foreground">
            Mô tả khóa học
          </h3>
        </div>
        <div className="text-muted-foreground leading-relaxed text-base">
          {course.description ? (
            <div dangerouslySetInnerHTML={{ __html: course.description }} />
          ) : (
            <p className="italic text-muted-foreground">
              Chưa có mô tả chi tiết cho khóa học này.
            </p>
          )}
        </div>
      </div>

      {/* Learning Outcomes Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-5 w-1 bg-primary rounded-full" />
          <h3 className="text-sm font-black capitalize tracking-[0.15em] text-foreground">
            Giá trị nhận được
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
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
            <Item
              key={i}
              className="border-none px-0 py-1 hover:bg-transparent"
            >
              <ItemMedia>
                <IconCheck className="size-5 text-emerald-600" stroke={2.5} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-[15px] font-medium text-foreground">
                  {outcome}
                </ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </div>
      </div>
    </div>
  );
}
