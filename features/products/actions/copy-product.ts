"use server"

import { api } from "@/lib/api"
import type { Product } from "../types"

export async function copyProduct(productId: string): Promise<Product> {
  return api<Product>(`/api/products/${productId}/copy`, {
    method: "POST",
  })
}
