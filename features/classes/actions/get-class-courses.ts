"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import type { ClassCourse } from "../types"

type GetClassCoursesParams = {
  page: number
  limit: number
  q?: string
}

export async function getClassCourses(
  classCode: string,
  params: GetClassCoursesParams
): Promise<PaginatedResponse<ClassCourse>> {
  return api<PaginatedResponse<ClassCourse>>(
    `/api/v1/classes/${classCode}/courses`,
    {
      query: {
        page: params.page,
        limit: params.limit,
        q: params.q || undefined,
      },
    }
  )
}
