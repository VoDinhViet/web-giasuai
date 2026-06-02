"use server"

import { api } from "@/lib/api"
import type { PaginatedResponse } from "@/types/api"
import type { Client } from "@/features/clients/types"
import type { Supplier } from "@/features/suppliers/types"
import {
  ProductStatus,
  type Product,
  type ProductFormOptions,
  type ProductOption,
} from "../types"

export async function getProductFormOptions(): Promise<ProductFormOptions> {
  const [productsResponse, units, operations] = await Promise.all([
    api<PaginatedResponse<Product>>("/api/products", {
      query: {
        page: 1,
        limit: 200,
        status: ProductStatus.ACTIVE,
      },
    }),
    api<ProductOption[]>("/api/products/units/options"),
    api<ProductOption[]>("/api/products/operations/options"),
  ])
  let clients: ProductFormOptions["clients"] = []
  let suppliers: ProductFormOptions["suppliers"] = []

  const clientsPromise = api<PaginatedResponse<Client>>("/api/clients", {
    query: {
      page: 1,
      limit: 100,
    },
  })
  const suppliersPromise = api<PaginatedResponse<Supplier>>("/api/suppliers", {
    query: {
      page: 1,
      limit: 100,
    },
  })

  try {
    const clientsResponse = await clientsPromise

    clients = clientsResponse.data.map((client) => ({
      id: client.id,
      code: client.code,
      fullName: client.fullName,
    }))
  } catch {
    clients = []
  }

  try {
    const suppliersResponse = await suppliersPromise

    suppliers = suppliersResponse.data.map((supplier) => ({
      id: supplier.id,
      code: supplier.code,
      name: supplier.name,
    }))
  } catch {
    suppliers = []
  }

  return {
    clients,
    operations,
    products: productsResponse.data.map((product) => ({
      id: product.id,
      code: product.code,
      name: product.name,
      itemType: product.itemType,
      unit: product.unit,
    })),
    suppliers,
    units,
  }
}
