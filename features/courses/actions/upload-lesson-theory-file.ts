"use server"

import { api } from "@/lib/api"
import type { LessonTheoryPartFile } from "../types"
import { revalidateCoursePaths } from "../utils/course-revalidation.util"

export async function uploadLessonTheoryFile(
  courseCode: string,
  lessonCode: string,
  partId: string,
  formData: FormData
): Promise<LessonTheoryPartFile> {
  const file = await api<LessonTheoryPartFile>(
    `/api/v1/courses/${courseCode}/lessons/${lessonCode}/theory-parts/${partId}/files`,
    {
      method: "POST",
      body: formData,
    }
  )

  revalidateCoursePaths(courseCode, lessonCode)

  return file
}
