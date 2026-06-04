"use server"

import { api } from "@/lib/api"
import type { SupplierGroup } from "../types"

export async function getSupplierGroupOptions(): Promise<SupplierGroup[]> {
  return api<SupplierGroup[]>("/api/suppliers/groups/options")
}
