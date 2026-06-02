"use server"

import { api } from "@/lib/api"
import type { Product } from "../types"

export async function uploadProductImage(
  productId: string,
  formData: FormData
): Promise<Product> {
  return api<Product>(`/api/products/${productId}/image`, {
    method: "POST",
    body: formData,
  })
}

export async function deleteProductImage(productId: string): Promise<Product> {
  return api<Product>(`/api/products/${productId}/image`, {
    method: "DELETE",
  })
}
