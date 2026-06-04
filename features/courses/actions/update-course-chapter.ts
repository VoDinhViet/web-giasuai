"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import {
  updateCourseChapterSchema,
  type UpdateCourseChapterInput,
} from "../schemas/course-structure.schema"
import type { CourseChapter } from "../types"
import { revalidateCoursePaths } from "../utils/course-revalidation.util"

export async function updateCourseChapter(
  courseCode: string,
  chapterCode: string,
  input: UpdateCourseChapterInput
): Promise<CourseChapter> {
  const reqDto = updateCourseChapterSchema.parse(input)
  const chapter = await api<CourseChapter>(
    `/api/v1/courses/${courseCode}/chapters/${chapterCode}`,
    {
      method: "PATCH",
      body: omitEmptyFields({
        chapterTitle: reqDto.chapterTitle,
        order: reqDto.order,
      }),
    }
  )

  revalidateCoursePaths(courseCode)

  return chapter
}
