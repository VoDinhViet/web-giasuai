"use server"

import { api } from "@/lib/api"
import type { CourseLessonDetail } from "../types"

export async function getCourseLesson(
  courseCode: string,
  lessonCode: string
): Promise<CourseLessonDetail> {
  return api<CourseLessonDetail>(
    `/api/v1/courses/${courseCode}/lessons/${lessonCode}`
  )
}
