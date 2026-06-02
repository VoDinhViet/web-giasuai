"use client";

import { useQueryState, parseAsStringEnum } from "nuqs";

import { CourseActionCard } from "./CourseActionCard";
import { CourseDetailTitle } from "./CourseDetailTitle";
import { CourseHeroCard } from "./CourseHeroCard";
import { CourseTab, CourseTabsCard } from "./CourseTabsCard";

import type { Course } from "@/features/classes/types/course.type";
import type { CourseSectionWithLessons } from "@/features/courses/types/course-section.type";

interface CourseDetailProps {
  course: Course;
  courseSections?: CourseSectionWithLessons[] | null;
}


export function CourseDetail({ course, courseSections }: CourseDetailProps) {
  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsStringEnum<CourseTab>(Object.values(CourseTab)).withDefault(
      CourseTab.OVERVIEW,
    ),
  );

  const firstLessonId = getFirstLessonId(courseSections);
  const totalLessons = getTotalLessons(courseSections);

  return (
    <div className="space-y-6 pb-16">
      <CourseDetailTitle title={course.title} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="space-y-6">
          <CourseHeroCard course={course} />
          <CourseTabsCard
            activeTab={activeTab}
            course={course}
            courseSections={courseSections || []}
            onTabChange={(value) => setActiveTab(value as CourseTab)}
          />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <CourseActionCard
            course={course}
            totalLessons={totalLessons}
            firstLessonId={firstLessonId}
          />
        </aside>
      </div>
    </div>
  );
}

function getFirstLessonId(courseSections?: CourseSectionWithLessons[] | null) {
  return courseSections?.flatMap((section) => section.lessons)[0]?.id;
}

function getTotalLessons(courseSections?: CourseSectionWithLessons[] | null) {
  return (
    courseSections?.reduce((acc, section) => acc + section.lessons.length, 0) ??
    0
  );
}
