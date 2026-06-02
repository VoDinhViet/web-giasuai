"use server"

import { api } from "@/lib/api"
import {
  type UpdateProductFormInput,
  updateProductFormSchema,
} from "../schemas/product.schema"
import type { Product } from "../types"

export async function updateProduct(
  productId: string,
  input: UpdateProductFormInput
): Promise<Product> {
  const reqDto = updateProductFormSchema.parse(input)

  return api<Product>(`/api/products/${productId}`, {
    method: "PATCH",
    body: {
      clientId: reqDto.clientId === "none" ? null : reqDto.clientId,
      code: reqDto.code,
      name: reqDto.name,
      itemType: reqDto.itemType,
      unitId: reqDto.unitId,
      status: reqDto.status,
      imageUrl: reqDto.imageUrl || null,
      note: reqDto.note || null,
    },
  })
}
