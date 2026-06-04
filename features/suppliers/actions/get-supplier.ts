"use server"

import { api } from "@/lib/api"
import type { Supplier } from "../types"

export async function getSupplier(supplierId: string): Promise<Supplier> {
  return api<Supplier>(`/api/suppliers/${supplierId}`)
}
