"use client"

import { useTransition } from "react"
import { useQueryStates } from "nuqs"

import { DataTable } from "@/components/data-table"
import type { Pagination } from "@/types/api"
import { suppliersSearchParams } from "../lib/search-params"
import type { Supplier } from "../types"
import { createSuppliersTableColumns } from "./suppliers-table-columns"
import { SuppliersTableFilter } from "./suppliers-table-filter"

type SuppliersTableProps = {
  suppliers: Supplier[]
  pagination: Pagination
}

export function SuppliersTable({ suppliers, pagination }: SuppliersTableProps) {
  const [isPending, startTransition] = useTransition()
  const [params, setParams] = useQueryStates(suppliersSearchParams, {
    shallow: false,
    startTransition,
  })

  const columns = createSuppliersTableColumns()

  return (
    <div
      className="min-w-0 overflow-hidden rounded-(--radius) border border-border/80 bg-card shadow-xs"
      aria-busy={isPending}
    >
      <SuppliersTableFilter
        filters={params}
        onFiltersChange={(filters) => setParams({ ...filters, page: 1 })}
      />
      <DataTable
        columns={columns}
        rows={suppliers}
        pagination={pagination}
        isLoading={isPending}
        tableClassName="min-w-205"
        onPageChange={(page) => setParams({ page })}
        onPageSizeChange={(limit) => setParams({ limit, page: 1 })}
      />
    </div>
  )
}
