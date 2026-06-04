"use server"

import { api } from "@/lib/api"
import {
  publishCourseLessonSchema,
  type PublishCourseLessonInput,
} from "../schemas/lesson-content.schema"
import type { CourseLessonDetail } from "../types"
import { revalidateCoursePaths } from "../utils/course-revalidation.util"

export async function publishCourseLesson(
  courseCode: string,
  lessonCode: string,
  input: PublishCourseLessonInput
): Promise<CourseLessonDetail> {
  const reqDto = publishCourseLessonSchema.parse(input)
  const lesson = await api<CourseLessonDetail>(
    `/api/v1/courses/${courseCode}/lessons/${lessonCode}/publish`,
    {
      method: "PATCH",
      body: {
        status: reqDto.status,
      },
    }
  )

  revalidateCoursePaths(courseCode, lessonCode)

  return lesson
}
