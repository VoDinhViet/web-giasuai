"use server"

import { api } from "@/lib/api"
import {
  type UpdateBomLineFormInput,
  updateBomLineFormSchema,
} from "../schemas/product.schema"
import type { BomLine } from "../types"

export async function updateBomLine(
  productId: string,
  revisionId: string,
  bomLineId: string,
  input: UpdateBomLineFormInput
): Promise<BomLine> {
  const reqDto = updateBomLineFormSchema.parse(input)

  return api<BomLine>(
    `/api/products/${productId}/revisions/${revisionId}/bom-lines/${bomLineId}`,
    {
      method: "PATCH",
      body: {
        qty: Number(reqDto.qty),
        unitId: reqDto.unitId || undefined,
        note: reqDto.note || undefined,
      },
    }
  )
}
