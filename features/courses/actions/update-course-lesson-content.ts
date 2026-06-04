"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import {
  updateLessonContentSchema,
  type UpdateLessonContentInput,
} from "../schemas/lesson-content.schema"
import type { CourseLessonDetail } from "../types"
import { revalidateCoursePaths } from "../utils/course-revalidation.util"

export async function updateCourseLessonContent(
  courseCode: string,
  lessonCode: string,
  input: UpdateLessonContentInput
): Promise<CourseLessonDetail> {
  const reqDto = updateLessonContentSchema.parse(input)
  const lesson = await api<CourseLessonDetail>(
    `/api/v1/courses/${courseCode}/lessons/${lessonCode}/content`,
    {
      method: "PUT",
      body: omitEmptyFields({
        summary: reqDto.summary,
        theoryParts: reqDto.theoryParts,
        simulation: reqDto.simulation,
        exercise: reqDto.exercise,
      }),
    }
  )

  revalidateCoursePaths(courseCode, lessonCode)

  return lesson
}
