"use server"

import { api } from "@/lib/api"
import type { CourseCurriculum } from "../types/curriculum"

export async function getCourseCurriculumById(courseId: string): Promise<CourseCurriculum> {
  // Gọi trực tiếp API lấy curriculum bằng UUID của khóa học
  return api<CourseCurriculum>(`/api/v1/courses/${courseId}/curriculum`)
}
