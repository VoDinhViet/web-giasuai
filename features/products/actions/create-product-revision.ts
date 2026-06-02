"use server"

import { api } from "@/lib/api"
import {
  createProductRevisionFormSchema,
  type CreateProductRevisionFormInput,
} from "../schemas/product.schema"
import type { ProductRevision } from "../types"

export async function createProductRevision(
  productId: string,
  input: CreateProductRevisionFormInput
): Promise<ProductRevision> {
  const reqDto = createProductRevisionFormSchema.parse(input)

  return api<ProductRevision>(`/api/products/${productId}/revisions`, {
    method: "POST",
    body: {
      revisionNo: reqDto.revisionNo,
      copyFromRevisionId:
        reqDto.copyFromRevisionId === "none"
          ? undefined
          : reqDto.copyFromRevisionId,
      note: reqDto.note || undefined,
    },
  })
}
