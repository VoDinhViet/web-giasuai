"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import type { User } from "../types"
import type { UsersSearchParams } from "../lib/load-users-search-params"
import { usersCacheTag } from "../utils/user-cache.util"

export async function getUsers(
  params: UsersSearchParams
): Promise<PaginatedResponse<User>> {
  const status = params.status === "all" ? undefined : params.status

  return api<PaginatedResponse<User>>("/api/users", {
    next: {
      tags: [usersCacheTag],
    },
    query: {
      page: params.page,
      limit: params.limit,
      q: params.q || undefined,
      roleId: params.roleId === "all" ? undefined : params.roleId,
      status,
    },
  })
}
