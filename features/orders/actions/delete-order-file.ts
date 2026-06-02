"use server"

import { api } from "@/lib/api"
import type { OrderFile } from "../types"

export async function deleteOrderFile(
  orderId: string,
  fileId: string
): Promise<OrderFile> {
  return api<OrderFile>(`/api/orders/${orderId}/files/${fileId}`, {
    method: "DELETE",
  })
}
