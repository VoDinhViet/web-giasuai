"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import type { User } from "../types"
import type { UsersSearchParams } from "../lib/load-users-search-params"
import { normalizeUserStatus } from "../lib/user-input.util"

export async function getUsers(
  params: UsersSearchParams
): Promise<PaginatedResponse<User>> {
  const status =
    params.status === "all" ? undefined : normalizeUserStatus(params.status)

  return api<PaginatedResponse<User>>("/api/users", {
    query: {
      page: params.page,
      limit: params.limit,
      q: params.q || undefined,
      roleId: params.roleId === "all" ? undefined : params.roleId,
      status,
    },
  })
}
