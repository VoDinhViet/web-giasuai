"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import {
  updateCourseSchema,
  type UpdateCourseInput,
} from "../schemas/course-form.schema"
import type { CourseDetail } from "../types"
import { revalidateCoursePaths } from "../utils/course-revalidation.util"

export async function updateCourse(
  courseCode: string,
  input: UpdateCourseInput
): Promise<CourseDetail> {
  const reqDto = updateCourseSchema.parse(input)
  const course = await api<CourseDetail>(`/api/v1/courses/${courseCode}`, {
    method: "PATCH",
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
    }),
  })

  revalidateCoursePaths(course.code)

  return course
}
