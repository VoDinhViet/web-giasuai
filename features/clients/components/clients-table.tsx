"use client"

import { useTransition } from "react"
import { useQueryStates } from "nuqs"

import { DataTable } from "@/components/data-table"
import type { Pagination } from "@/types/api"
import { clientsSearchParams } from "../lib/search-params"
import type { Client } from "../types"
import { createClientsTableColumns } from "./clients-table-columns"
import { ClientsTableFilter } from "./clients-table-filter"

type ClientsTableProps = {
  clients: Client[]
  pagination: Pagination
}

export function ClientsTable({ clients, pagination }: ClientsTableProps) {
  const [isPending, startTransition] = useTransition()
  const [params, setParams] = useQueryStates(clientsSearchParams, {
    shallow: false,
    startTransition,
  })

  const columns = createClientsTableColumns()

  return (
    <div
      className="min-w-0 overflow-hidden rounded-(--radius) border border-border/80 bg-card shadow-xs"
      aria-busy={isPending}
    >
      <ClientsTableFilter
        filters={params}
        isLoading={isPending}
        onFiltersChange={(filters) => setParams({ ...filters, page: 1 })}
      />
      <DataTable
        columns={columns}
        rows={clients}
        pagination={pagination}
        rowLabel="khách hàng"
        emptyTitle="Không có khách hàng"
        emptyDescription="Thử thay đổi từ khóa tìm kiếm hoặc thêm khách hàng mới."
        isLoading={isPending}
        tableClassName="min-w-260"
        onPageChange={(page) => setParams({ page })}
        onPageSizeChange={(limit) => setParams({ limit, page: 1 })}
      />
    </div>
  )
}
