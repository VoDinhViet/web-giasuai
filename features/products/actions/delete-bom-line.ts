"use server"

import { api } from "@/lib/api"
import type { BomLine } from "../types"

export async function deleteBomLine(
  productId: string,
  revisionId: string,
  bomLineId: string
): Promise<BomLine> {
  return api<BomLine>(
    `/api/products/${productId}/revisions/${revisionId}/bom-lines/${bomLineId}`,
    {
      method: "DELETE",
    }
  )
}
