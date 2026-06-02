"use server"

import { api } from "@/lib/api"
import { orderFormSchema, type OrderFormInput } from "../schemas/order.schema"
import type { Order } from "../types"

export async function createOrder(input: OrderFormInput): Promise<Order> {
  const reqDto = orderFormSchema.parse(input)

  return api<Order>("/api/orders", {
    method: "POST",
    body: {
      clientId: reqDto.clientId,
      code: reqDto.code,
      prNumber: reqDto.prNumber,
      dueDate: reqDto.dueDate,
      vatRate: reqDto.vatRate,
      note: reqDto.note || undefined,
      items: reqDto.items.map((orderItem) => ({
        productId: orderItem.productId,
        unit: orderItem.unit || undefined,
        quantity: orderItem.quantity,
      })),
    },
  })
}
