"use server"

import { api } from "@/lib/api"
import type { OrderFile } from "../types"

export async function uploadOrderPdf(
  orderId: string,
  formData: FormData
): Promise<OrderFile> {
  return api<OrderFile>(`/api/orders/${orderId}/files/order-pdf`, {
    method: "POST",
    body: formData,
  })
}
