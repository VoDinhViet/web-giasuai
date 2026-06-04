"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import {
  createCourseChapterSchema,
  type CreateCourseChapterInput,
} from "../schemas/course-structure.schema"
import type { CourseChapter } from "../types"
import { revalidateCoursePaths } from "../utils/course-revalidation.util"

export async function createCourseChapter(
  courseCode: string,
  input: CreateCourseChapterInput
): Promise<CourseChapter> {
  const reqDto = createCourseChapterSchema.parse(input)
  const chapter = await api<CourseChapter>(
    `/api/v1/courses/${courseCode}/chapters`,
    {
      method: "POST",
      body: omitEmptyFields({
        chapterCode: reqDto.chapterCode,
        chapterTitle: reqDto.chapterTitle,
        order: reqDto.order,
      }),
    }
  )

  revalidateCoursePaths(courseCode)

  return chapter
}
