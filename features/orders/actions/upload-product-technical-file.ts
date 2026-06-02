"use server"

import { api } from "@/lib/api"
import type { OrderProductFile } from "../types"

export async function uploadProductTechnicalFile(
  productId: string,
  formData: FormData
): Promise<OrderProductFile> {
  return api<OrderProductFile>(`/api/products/${productId}/files`, {
    method: "POST",
    body: formData,
  })
}
