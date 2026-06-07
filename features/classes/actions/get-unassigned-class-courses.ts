"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import type { UnassignedClassCourse } from "../types/course"

type GetUnassignedClassCoursesParams = {
  page: number
  limit: number
  q?: string
}

export async function getUnassignedClassCourses(
  classCode: string,
  params: GetUnassignedClassCoursesParams
): Promise<PaginatedResponse<UnassignedClassCourse>> {
  return api<PaginatedResponse<UnassignedClassCourse>>(
    `/api/v1/classes/${classCode}/unassigned-courses`,
    {
      query: {
        page: params.page,
        limit: params.limit,
        q: params.q || undefined,
      },
    }
  )
}
