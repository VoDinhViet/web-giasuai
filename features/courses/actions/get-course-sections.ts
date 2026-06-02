"use server";

import { api } from "@/lib/api";
import type { CourseSectionWithLessons } from "@/features/courses/types/course-section.type";

export async function getCourseSections(courseId: string) {
  return await api<CourseSectionWithLessons[]>(`/api/v1/courses/${courseId}/sections`, {
    method: "GET",
  });
}
