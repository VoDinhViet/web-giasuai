"use server"

import { api } from "@/lib/api"
import {
  type UpdateRoutingFormInput,
  updateRoutingFormSchema,
} from "../schemas/product.schema"
import type { RoutingStep } from "../types"

export async function updateRouting(
  productId: string,
  revisionId: string,
  itemId: string,
  input: UpdateRoutingFormInput
): Promise<RoutingStep[]> {
  const reqDto = updateRoutingFormSchema.parse(input)

  return api<RoutingStep[]>(
    `/api/products/${productId}/revisions/${revisionId}/items/${itemId}/routing`,
    {
      method: "PUT",
      body: {
        steps: reqDto.steps.map((step) => ({
          operationId: step.operationId,
          stepNo: step.stepNo,
          isOutsideProcess: step.isOutsideProcess,
          defaultSupplierId:
            step.isOutsideProcess && step.defaultSupplierId !== "none"
              ? step.defaultSupplierId
              : null,
          note: step.note || null,
        })),
      },
    }
  )
}
