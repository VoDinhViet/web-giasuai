"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import type { Client } from "@/features/clients/types"
import type { ProductClient } from "../types"

export type ProductListOptions = {
  clients: ProductClient[]
}

export async function getProductListOptions(): Promise<ProductListOptions> {
  try {
    const clientsResponse = await api<PaginatedResponse<Client>>(
      "/api/clients",
      {
        query: {
          page: 1,
          limit: 100,
        },
      }
    )

    return {
      clients: clientsResponse.data.map((client) => ({
        id: client.id,
        code: client.code,
        fullName: client.fullName,
      })),
    }
  } catch {
    return {
      clients: [],
    }
  }
}
