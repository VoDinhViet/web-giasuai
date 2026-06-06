"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import type { ClassLearner } from "../types"

type GetClassLearnersParams = {
  page: number
  limit: number
  q?: string
}

export async function getClassLearners(
  classCode: string,
  params: GetClassLearnersParams
): Promise<PaginatedResponse<ClassLearner>> {
  return api<PaginatedResponse<ClassLearner>>(
    `/api/v1/classes/${classCode}/learners`,
    {
      query: {
        page: params.page,
        limit: params.limit,
        q: params.q || undefined,
      },
    }
  )
}
