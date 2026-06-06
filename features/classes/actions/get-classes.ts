"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import { buildClassesApiQuery } from "../lib/classes-api-query"
import type { ClassesSearchParams } from "../lib/load-classes-search-params"
import type { Class } from "../types"

export async function getClasses(
  params: ClassesSearchParams
): Promise<PaginatedResponse<Class>> {
  const query = buildClassesApiQuery(params)
  const classesResponse = await api<PaginatedResponse<Class>>(
    "/api/v1/classes",
    {
      query,
    }
  )

  console.log("getClasses response:", {
    query,
    classesResponse,
  })

  return classesResponse
}
