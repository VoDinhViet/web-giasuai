"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import {
  createCourseSchema,
  type CreateCourseInput,
} from "../schemas/course-form.schema"
import type { CourseDetail } from "../types"
import { revalidateCoursePaths } from "../utils/course-revalidation.util"

export async function createCourse(
  input: CreateCourseInput
): Promise<CourseDetail> {
  const reqDto = createCourseSchema.parse(input)
  const course = await api<CourseDetail>("/api/v1/courses", {
    method: "POST",
    body: omitEmptyFields({
      code: reqDto.code,
      name: reqDto.name,
      category: reqDto.category,
      description: reqDto.description,
      audience: reqDto.audience,
      level: reqDto.level,
      durationMinutes: reqDto.durationMinutes,
      startDate: reqDto.startDate,
      status: reqDto.status,
      chapters: reqDto.chapters,
      lessons: reqDto.lessons,
    }),
  })

  revalidateCoursePaths(course.code)

  return course
}
