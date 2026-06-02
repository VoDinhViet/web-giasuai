"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import { isEnumValue } from "@/lib/enum.util"
import type { ProductsSearchParams } from "../lib/load-products-search-params"
import { ProductItemType, ProductStatus, type Product } from "../types"

function normalizeProductItemTypeFilter(value: string) {
  if (isEnumValue(ProductItemType, value)) {
    return value
  }

  return undefined
}

function normalizeProductStatusFilter(value: string) {
  if (isEnumValue(ProductStatus, value)) {
    return value
  }

  return undefined
}

export async function getProducts(
  params: ProductsSearchParams
): Promise<PaginatedResponse<Product>> {
  const itemType =
    params.itemType === "all"
      ? undefined
      : normalizeProductItemTypeFilter(params.itemType)
  const status =
    params.status === "all"
      ? undefined
      : normalizeProductStatusFilter(params.status)

  return api<PaginatedResponse<Product>>("/api/products", {
    query: {
      page: params.page,
      limit: params.limit,
      q: params.q || undefined,
      clientId: params.clientId === "all" ? undefined : params.clientId,
      itemType,
      status,
    },
  })
}
