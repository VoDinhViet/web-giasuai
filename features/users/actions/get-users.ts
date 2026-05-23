"use server"

import { api } from "@/lib/api"
import { getSession } from "@/lib/session"
import type { PaginatedResponse } from "@/types/api"
import type { User } from "../types"
import type { UsersSearchParams } from "../lib/load-users-search-params"

export async function getUsers(
  params: UsersSearchParams
): Promise<PaginatedResponse<User>> {
  const session = await getSession()

  return api<PaginatedResponse<User>>("/api/users", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    query: {
      page: params.page,
      limit: params.limit,
      q: params.search || undefined,
    },
  })
}
