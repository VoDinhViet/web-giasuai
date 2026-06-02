"use server"

import { api } from "@/lib/api"
import {
  createBomLineFormSchema,
  type CreateBomLineFormInput,
} from "../schemas/product.schema"

export async function createBomLine(
  productId: string,
  revisionId: string,
  parentItemId: string,
  input: CreateBomLineFormInput
): Promise<unknown> {
  const reqDto = createBomLineFormSchema.parse(input)

  return api(`/api/products/${productId}/revisions/${revisionId}/bom-lines`, {
    method: "POST",
    body: {
      parentItemId,
      childItemId: reqDto.childItemId,
      qty: Number(reqDto.qty),
      unitId: reqDto.unitId,
      note: reqDto.note || undefined,
    },
  })
}
