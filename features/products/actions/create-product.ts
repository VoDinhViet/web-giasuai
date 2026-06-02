"use server"

import { api } from "@/lib/api"
import {
  createProductFormSchema,
  type CreateProductFormInput,
} from "../schemas/product.schema"
import type { Product } from "../types"

export async function createProduct(
  input: CreateProductFormInput
): Promise<Product> {
  const reqDto = createProductFormSchema.parse(input)

  return api<Product>("/api/products", {
    method: "POST",
    body: {
      clientId: reqDto.clientId === "none" ? undefined : reqDto.clientId,
      code: reqDto.code,
      name: reqDto.name,
      itemType: reqDto.itemType,
      unitId: reqDto.unitId,
      revisionNo: reqDto.revisionNo,
      imageUrl: reqDto.imageUrl || undefined,
      note: reqDto.note || undefined,
    },
  })
}
