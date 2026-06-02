"use server"

import { api } from "@/lib/api"
import type { Order } from "../types"

export async function approveOrder(orderId: string): Promise<Order> {
  return api<Order>(`/api/orders/${orderId}/approve`, {
    method: "POST",
  })
}
