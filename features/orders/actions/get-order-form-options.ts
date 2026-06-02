"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import type {
  OrderClient,
  OrderFormOptions,
  OrderProductOption,
} from "../types"

export async function getOrderFormOptions(): Promise<OrderFormOptions> {
  const [clientsResponse, products] = await Promise.all([
    api<PaginatedResponse<OrderClient>>("/api/clients", {
      query: {
        limit: 100,
        page: 1,
      },
    }),
    api<OrderProductOption[]>("/api/orders/product-options"),
  ])

  return {
    clients: clientsResponse.data,
    products,
  }
}
