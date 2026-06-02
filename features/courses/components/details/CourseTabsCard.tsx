"use client";

import { IconBook2, IconFileText, IconUsers } from "@tabler/icons-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Course } from "@/features/classes/types/course.type";
import type { CourseSectionWithLessons } from "@/features/courses/types/course-section.type";

import { CourseOverview } from "./CourseOverview";
import { CourseCurriculum } from "./CourseCurriculum";
import { CourseInstructor } from "./CourseInstructor";

export enum CourseTab {
  OVERVIEW = "overview",
  CURRICULUM = "curriculum",
  INSTRUCTOR = "instructor",
}

const COURSE_TABS = [
  {
    id: CourseTab.OVERVIEW,
    label: "Tổng quan",
    icon: IconFileText,
  },
  {
    id: CourseTab.CURRICULUM,
    label: "Chương trình",
    icon: IconBook2,
  },
  {
    id: CourseTab.INSTRUCTOR,
    label: "Người biên soạn",
    icon: IconUsers,
  },
];

interface CourseTabsCardProps {
  activeTab: CourseTab;
  course: Course;
  courseSections: CourseSectionWithLessons[];
  onTabChange: (value: string) => void;
}

export function CourseTabsCard({
  activeTab,
  course,
  courseSections,
  onTabChange,
}: CourseTabsCardProps) {
  return (
    <Card>
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <CardHeader>
          <TabsList className="max-w-full overflow-x-auto">
            {COURSE_TABS.map((tab) => {
              const Icon = tab.icon;

              return (
                <TabsTrigger key={tab.id} value={tab.id}>
                  <Icon size={14} />
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </CardHeader>

        <CardContent className="p-6 sm:p-7">
          <TabsContent value={CourseTab.OVERVIEW} className="mt-0 outline-none">
            <CourseOverview course={course} />
          </TabsContent>
          <TabsContent value={CourseTab.CURRICULUM} className="mt-0 outline-none">
            <CourseCurriculum sections={courseSections} />
          </TabsContent>
          <TabsContent value={CourseTab.INSTRUCTOR} className="mt-0 outline-none">
            <CourseInstructor />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
