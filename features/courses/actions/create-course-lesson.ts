"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import {
  createCourseLessonSchema,
  type CreateCourseLessonInput,
} from "../schemas/course-structure.schema"
import type { CourseLessonStructureItem } from "../types"
import { revalidateCoursePaths } from "../utils/course-revalidation.util"

export async function createCourseLesson(
  courseCode: string,
  input: CreateCourseLessonInput
): Promise<CourseLessonStructureItem> {
  const reqDto = createCourseLessonSchema.parse(input)
  const lesson = await api<CourseLessonStructureItem>(
    `/api/v1/courses/${courseCode}/lessons`,
    {
      method: "POST",
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

  revalidateCoursePaths(courseCode)

  return lesson
}
