"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import { buildClassesApiQuery } from "../lib/classes-api-query"
import type { ClassesSearchParams } from "../lib/load-classes-search-params"
import type { ClassListItem } from "../types"

export async function getClasses(
  params: ClassesSearchParams
): Promise<PaginatedResponse<ClassListItem>> {
  return api<PaginatedResponse<ClassListItem>>("/api/v1/classes", {
    query: buildClassesApiQuery(params),
  })
}
