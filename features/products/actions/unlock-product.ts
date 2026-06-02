"use server"

import { api } from "@/lib/api"
import type { Product } from "../types"

export async function unlockProduct(productId: string): Promise<Product> {
  return api<Product>(`/api/products/${productId}/unlock`, {
    method: "PATCH",
  })
}
