"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import { buildClassesApiQuery } from "../lib/classes-api-query"
import type { ClassesSearchParams } from "../lib/load-classes-search-params"
import type { Class } from "../types"
import { classesCacheTag } from "../utils/class-cache.util"

export async function getClasses(
  params: ClassesSearchParams
): Promise<PaginatedResponse<Class>> {
  const query = buildClassesApiQuery(params)
  const classesResponse = await api<PaginatedResponse<Class>>(
    "/api/v1/classes",
    {
      query,
      next: {
        tags: [classesCacheTag],
      },
    }
  )

  console.log("getClasses response:", {
    query,
    classesResponse,
  })

  return classesResponse
}
