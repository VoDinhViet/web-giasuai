"use server";

import { api } from "@/lib/api";
import type { Course } from "@/features/classes/types/course.type";

export async function getCourseDetail(courseId: string): Promise<Course> {
  return await api<Course>(`/api/v1/courses/${courseId}`, {
    method: "GET",
  });
}
