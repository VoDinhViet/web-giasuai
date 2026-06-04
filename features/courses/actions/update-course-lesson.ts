"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import {
  updateCourseLessonSchema,
  type UpdateCourseLessonInput,
} from "../schemas/course-structure.schema"
import type { CourseLessonStructureItem } from "../types"
import { revalidateCoursePaths } from "../utils/course-revalidation.util"

export async function updateCourseLesson(
  courseCode: string,
  lessonCode: string,
  input: UpdateCourseLessonInput
): Promise<CourseLessonStructureItem> {
  const reqDto = updateCourseLessonSchema.parse(input)
  const lesson = await api<CourseLessonStructureItem>(
    `/api/v1/courses/${courseCode}/lessons/${lessonCode}`,
    {
      method: "PATCH",
      body: omitEmptyFields({
        chapterCode: reqDto.chapterCode,
        lessonCode: reqDto.lessonCode,
        lessonTitle: reqDto.lessonTitle,
        lessonType: reqDto.lessonType,
        durationMinutes: reqDto.durationMinutes,
        status: reqDto.status,
        resourceCount: reqDto.resourceCount,
        position: reqDto.position,
      }),
    }
  )

  revalidateCoursePaths(courseCode, lesson.lessonCode)

  return lesson
}
