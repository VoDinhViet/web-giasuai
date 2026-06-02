"use server"

import { api } from "@/lib/api"
import {
  type UpdateProductRevisionFormInput,
  updateProductRevisionFormSchema,
} from "../schemas/product.schema"
import type { ProductRevision } from "../types"

export async function updateProductRevision(
  productId: string,
  revisionId: string,
  input: UpdateProductRevisionFormInput
): Promise<ProductRevision> {
  const reqDto = updateProductRevisionFormSchema.parse(input)

  return api<ProductRevision>(
    `/api/products/${productId}/revisions/${revisionId}`,
    {
      method: "PATCH",
      body: {
        revisionNo: reqDto.revisionNo,
        note: reqDto.note || null,
      },
    }
  )
}
