import type { ColumnDef } from "@tanstack/react-table"

import type { Supplier } from "../types"
import { DeleteSupplierPopover } from "./delete-supplier-popover"
import { EditSupplierDialog } from "./edit-supplier-dialog"

export function createSuppliersTableColumns(): ColumnDef<Supplier>[] {
  return [
    {
      accessorKey: "name",
      header: "Nhà cung cấp",
      cell: ({ row }) => {
        const supplier = row.original

        return (
          <div className="min-w-0">
            <p className="max-w-60 truncate text-sm leading-5 font-semibold text-foreground">
              {supplier.name}
            </p>
            <p className="text-[10px] leading-4 font-medium text-muted-foreground">
              {supplier.code}
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
          <p className="max-w-56 truncate leading-5 font-medium text-foreground">
            {row.original.email || "--"}
          </p>
          <p className="text-[10px] leading-4 text-muted-foreground">
            {row.original.phoneNumber || "--"}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: "Địa chỉ",
      cell: ({ row }) => (
        <span className="block max-w-96 truncate text-sm text-muted-foreground">
          {row.original.address || "--"}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="block text-right">Thao tác</span>,
      cell: ({ row }) => (
        <div className="flex justify-end gap-1 text-muted-foreground">
          <EditSupplierDialog supplier={row.original} />
          <DeleteSupplierPopover supplier={row.original} />
        </div>
      ),
    },
  ]
}
