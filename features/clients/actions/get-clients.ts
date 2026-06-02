"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import { isEnumValue } from "@/lib/enum.util"
import type { ClientsSearchParams } from "../lib/load-clients-search-params"
import { ClientType, type Client } from "../types"

function normalizeClientTypeFilter(value: string) {
  const normalizedClientType = value.toUpperCase()

  if (isEnumValue(ClientType, normalizedClientType)) {
    return normalizedClientType
  }

  return undefined
}

export async function getClients(
  params: ClientsSearchParams
): Promise<PaginatedResponse<Client>> {
  const clientType =
    params.clientType === "all"
      ? undefined
      : normalizeClientTypeFilter(params.clientType)

  return api<PaginatedResponse<Client>>("/api/clients", {
    query: {
      page: params.page,
      limit: params.limit,
      q: params.q || undefined,
      clientType,
    },
  })
}
