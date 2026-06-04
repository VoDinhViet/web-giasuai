"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import type { User } from "../types"
import type { UsersSearchParams } from "../lib/load-users-search-params"
import { usersCacheTag } from "../utils/user-cache.util"

export async function getUsers(
  params: UsersSearchParams
): Promise<PaginatedResponse<User>> {
  const isLocked =
    params.isLocked === "all" ? undefined : params.isLocked === "true"

  return api<PaginatedResponse<User>>("/api/v1/users", {
    next: {
      tags: [usersCacheTag],
    },
    query: {
      page: params.page,
      limit: params.limit,
      q: params.q || undefined,
      role: params.role === "all" ? undefined : params.role,
      isLocked,
    },
  })
}
