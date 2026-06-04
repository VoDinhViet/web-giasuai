"use client"

import { useTransition } from "react"
import { useQueryStates } from "nuqs"

import { DataTable } from "@/components/shared/data-table"
import type { Pagination } from "@/types/api"
import type { ProductListOptions } from "../../actions/get-product-list-options"
import { productsSearchParams } from "../../lib/search-params"
import type { Product, ProductFormOptions } from "../../types"
import { createProductsTableColumns } from "./products-table-columns"
import { ProductsTableFilter } from "./products-table-filter"

type ProductsTableProps = {
  formOptions: ProductFormOptions
  listOptions: ProductListOptions
  products: Product[]
  pagination: Pagination
}

export function ProductsTable({
  formOptions,
  listOptions,
  products,
  pagination,
}: ProductsTableProps) {
  const [isPending, startTransition] = useTransition()
  const [params, setParams] = useQueryStates(productsSearchParams, {
    shallow: false,
    startTransition,
  })

  const columns = createProductsTableColumns({ formOptions })

  return (
    <div
      className="min-w-0 overflow-hidden rounded-(--radius) border border-border/80 bg-card shadow-xs"
      aria-busy={isPending}
    >
      <ProductsTableFilter
        filters={params}
        listOptions={listOptions}
        isLoading={isPending}
        onFiltersChange={(filters) => setParams({ ...filters, page: 1 })}
      />
      <DataTable
        columns={columns}
        rows={products}
        pagination={pagination}
        isLoading={isPending}
        tableClassName="min-w-270"
        onPageChange={(page) => setParams({ page })}
        onPageSizeChange={(limit) => setParams({ limit, page: 1 })}
      />
    </div>
  )
}
