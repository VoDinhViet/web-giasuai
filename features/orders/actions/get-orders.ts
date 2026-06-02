"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import { isEnumValue } from "@/lib/enum.util"
import type { OrdersSearchParams } from "../lib/load-orders-search-params"
import { OrderStatus, type Order } from "../types"

function normalizeOrderStatusFilter(value: string) {
  if (isEnumValue(OrderStatus, value)) {
    return value
  }

  return undefined
}

export async function getOrders(
  params: OrdersSearchParams
): Promise<PaginatedResponse<Order>> {
  const status =
    params.status === "all"
      ? undefined
      : normalizeOrderStatusFilter(params.status)

  return api<PaginatedResponse<Order>>("/api/orders", {
    query: {
      page: params.page,
      limit: params.limit,
      q: params.q || undefined,
      clientId: params.clientId === "all" ? undefined : params.clientId,
      status,
    },
  })
}
