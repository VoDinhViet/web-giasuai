"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import type { SuppliersSearchParams } from "../lib/load-suppliers-search-params"
import type { Supplier } from "../types"

export async function getSuppliers(
  params: SuppliersSearchParams
): Promise<PaginatedResponse<Supplier>> {
  return api<PaginatedResponse<Supplier>>("/api/suppliers", {
    query: {
      page: params.page,
      limit: params.limit,
      q: params.q || undefined,
    },
  })
}
