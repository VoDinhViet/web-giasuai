"use server"

import { api } from "@/lib/api"
import type { RoutingStep } from "../types"

export async function getRouting(
  productId: string,
  revisionId: string,
  itemId: string
): Promise<RoutingStep[]> {
  return api<RoutingStep[]>(
    `/api/products/${productId}/revisions/${revisionId}/items/${itemId}/routing`
  )
}
