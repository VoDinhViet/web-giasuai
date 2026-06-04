"use server"

import { api } from "@/lib/api"
import {
  reorderCourseStructureSchema,
  type ReorderCourseStructureInput,
} from "../schemas/course-structure.schema"
import type { CourseStructure } from "../types"
import { revalidateCoursePaths } from "../utils/course-revalidation.util"

export async function reorderCourseStructure(
  courseCode: string,
  input: ReorderCourseStructureInput
): Promise<CourseStructure> {
  const reqDto = reorderCourseStructureSchema.parse(input)
  const courseStructure = await api<CourseStructure>(
    `/api/v1/courses/${courseCode}/structure/reorder`,
    {
      method: "PATCH",
      body: {
        chapters: reqDto.chapters,
        lessons: reqDto.lessons,
      },
    }
  )

  revalidateCoursePaths(courseCode)

  return courseStructure
}
