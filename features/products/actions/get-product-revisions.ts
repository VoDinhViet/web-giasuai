"use server"

import { api } from "@/lib/api"
import type { ProductRevision } from "../types"

export async function getProductRevisions(
  productId: string
): Promise<ProductRevision[]> {
  return api<ProductRevision[]>(`/api/products/${productId}/revisions`)
}
