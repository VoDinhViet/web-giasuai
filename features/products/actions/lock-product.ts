"use server"

import { api } from "@/lib/api"
import type { Product } from "../types"

export async function lockProduct(productId: string): Promise<Product> {
  return api<Product>(`/api/products/${productId}/lock`, {
    method: "PATCH",
  })
}
