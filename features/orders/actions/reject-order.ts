"use server"

import { api } from "@/lib/api"
import {
  rejectOrderFormSchema,
  type RejectOrderFormInput,
} from "../schemas/order.schema"
import type { Order } from "../types"

export async function rejectOrder(
  orderId: string,
  input: RejectOrderFormInput
): Promise<Order> {
  const reqDto = rejectOrderFormSchema.parse(input)

  return api<Order>(`/api/orders/${orderId}/reject`, {
    method: "POST",
    body: reqDto,
  })
}
