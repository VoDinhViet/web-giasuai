import type { ColumnDef } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { clientTypeLabel } from "../constants/client-table-constants"
import { ClientType, type Client } from "../types"
import { DeleteClientPopover } from "./delete-client-popover"
import { EditClientDialog } from "./edit-client-dialog"

export function createClientsTableColumns(): ColumnDef<Client>[] {
  return [
    {
      accessorKey: "fullName",
      header: "Khách hàng",
      cell: ({ row }) => {
        const client = row.original

        return (
          <div className="min-w-0">
            <p className="max-w-52 truncate text-sm leading-5 font-semibold text-foreground">
              {client.fullName}
            </p>
            <p className="text-[10px] leading-4 font-medium text-muted-foreground">
              {client.code}
            </p>
          </div>
        )
      },
    },
    {
      id: "contact",
      header: "Liên hệ",
      cell: ({ row }) => (
        <div className="min-w-0 text-sm">
          <p className="max-w-52 truncate leading-5 font-medium text-foreground">
            {row.original.email}
          </p>
          <p className="text-[10px] leading-4 text-muted-foreground">
            {row.original.phoneNumber}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "clientType",
      header: "Loại",
      cell: ({ row }) => {
        const clientType = row.original.clientType as ClientType

        return (
          <span
            className={cn(
              "inline-flex max-w-36 items-center justify-center rounded-(--radius) px-2.5 py-1 text-center text-[10px] leading-4 font-semibold uppercase",
              clientType === ClientType.COMPANY
                ? "bg-primary/10 text-primary ring-1 ring-primary/15"
                : "bg-muted text-muted-foreground ring-1 ring-border"
            )}
          >
            {clientTypeLabel[clientType] || "Khác"}
          </span>
        )
      },
    },
    {
      accessorKey: "taxCode",
      header: "Mã số thuế",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-foreground">
          {row.original.taxCode || "--"}
        </span>
      ),
    },
    {
      accessorKey: "companyName",
      header: "Công ty",
      cell: ({ row }) => (
        <span className="block max-w-56 truncate text-sm font-medium text-foreground">
          {row.original.companyName || "--"}
        </span>
      ),
    },
    {
      accessorKey: "address",
      header: "Địa chỉ",
      cell: ({ row }) => (
        <span className="block max-w-72 truncate text-sm text-muted-foreground">
          {row.original.address || "--"}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="block text-right">Thao tác</span>,
      cell: ({ row }) => (
        <div className="flex justify-end gap-1 text-muted-foreground">
          <EditClientDialog client={row.original} />
          <DeleteClientPopover client={row.original} />
        </div>
      ),
    },
  ]
}
