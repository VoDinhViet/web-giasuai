"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import type { CourseListItem } from "../types"
import type { CoursesSearchParams } from "../lib/load-courses-search-params"

export async function getCourses(
  params: CoursesSearchParams
): Promise<PaginatedResponse<CourseListItem>> {
  return api<PaginatedResponse<CourseListItem>>("/api/v1/courses", {
    query: {
      page: params.page,
      limit: params.limit,
      q: params.q || undefined,
      status: params.status === "all" ? undefined : params.status,
      category: params.category === "all" ? undefined : params.category,
    },
  })
}
