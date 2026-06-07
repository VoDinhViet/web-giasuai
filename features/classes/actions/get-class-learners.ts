"use server"

import { api } from "@/lib/api"
import type { User } from "@/features/users/types"
import type { PaginatedResponse } from "@/types/api"

type GetClassLearnersParams = {
  page: number
  limit: number
  q?: string
}

export async function getClassLearners(
  classCode: string,
  params: GetClassLearnersParams
): Promise<PaginatedResponse<User>> {
  return api<PaginatedResponse<User>>(`/api/v1/classes/${classCode}/learners`, {
    query: {
      page: params.page,
      limit: params.limit,
      q: params.q || undefined,
    },
  })
}
