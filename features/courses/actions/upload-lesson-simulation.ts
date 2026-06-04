"use server"

import { api } from "@/lib/api"
import type { LessonSimulation } from "../types"
import { revalidateCoursePaths } from "../utils/course-revalidation.util"

export async function uploadLessonSimulation(
  courseCode: string,
  lessonCode: string,
  formData: FormData
): Promise<LessonSimulation> {
  const simulation = await api<LessonSimulation>(
    `/api/v1/courses/${courseCode}/lessons/${lessonCode}/simulation`,
    {
      method: "POST",
      body: formData,
    }
  )

  revalidateCoursePaths(courseCode, lessonCode)

  return simulation
}
