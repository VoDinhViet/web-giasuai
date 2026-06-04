"use client"

import { useTransition } from "react"
import { useQueryStates } from "nuqs"

import { DataTable } from "@/components/shared/data-table"
import type { Pagination } from "@/types/api"
import { ordersSearchParams } from "../../lib/search-params"
import type { Order, OrderFormOptions } from "../../types"
import { createOrdersTableColumns } from "./orders-table-columns"
import { OrdersTableFilter } from "./orders-table-filter"

type OrdersTableProps = {
  formOptions: OrderFormOptions
  orders: Order[]
  pagination: Pagination
}

export function OrdersTable({
  formOptions,
  orders,
  pagination,
}: OrdersTableProps) {
  const [isPending, startTransition] = useTransition()
  const [params, setParams] = useQueryStates(ordersSearchParams, {
    shallow: false,
    startTransition,
  })

  const columns = createOrdersTableColumns({ formOptions })

  return (
    <div
      className="min-w-0 overflow-hidden rounded-(--radius) border border-border/80 bg-card shadow-xs"
      aria-busy={isPending}
    >
      <OrdersTableFilter
        filters={params}
        formOptions={formOptions}
        isLoading={isPending}
        onFiltersChange={(filters) => setParams({ ...filters, page: 1 })}
      />
      <DataTable
        columns={columns}
        rows={orders}
        pagination={pagination}
        isLoading={isPending}
        tableClassName="min-w-275"
        onPageChange={(page) => setParams({ page })}
        onPageSizeChange={(limit) => setParams({ limit, page: 1 })}
      />
    </div>
  )
}
