import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import type { Route } from "next"
import { Eye, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { getNameInitials } from "@/lib/string.util"
import type { Supplier } from "../../types"
import { DeleteSupplierPopover } from "../actions/delete-supplier-popover"

export function createSuppliersTableColumns(): ColumnDef<Supplier>[] {
  return [
    {
      id: "supplierCode",
      accessorKey: "code",
      header: "Mã NCC",
      cell: ({ row }) => (
        <span className="block max-w-24 truncate text-sm font-semibold text-primary">
          {row.original.code}
        </span>
      ),
    },
    {
      id: "supplierLogo",
      header: "",
      cell: ({ row }) => <SupplierLogo supplier={row.original} />,
    },
    {
      id: "supplierName",
      header: "Tên nhà cung cấp",
      cell: ({ row }) => {
        const supplier = row.original
        const subtitle = supplier.note || supplier.address || "--"

        return (
          <div className="min-w-0">
            <p className="max-w-72 truncate text-sm leading-5 font-bold text-foreground">
              {supplier.name}
            </p>
            <p className="max-w-72 truncate text-xs leading-5 text-muted-foreground">
              {subtitle}
            </p>
          </div>
        )
      },
    },
    {
      id: "supplierGroup",
      header: "Nhóm NCC",
      cell: ({ row }) => (
        <span className="block max-w-40 truncate text-sm font-medium text-foreground">
          {row.original.supplierGroup?.name || "--"}
        </span>
      ),
    },
    {
      id: "taxCode",
      accessorKey: "taxCode",
      header: "Mã số thuế",
      cell: ({ row }) => (
        <span className="block max-w-36 truncate text-sm font-medium text-foreground">
          {row.original.taxCode || "--"}
        </span>
      ),
    },
    {
      id: "contact",
      header: "Đại diện / Người liên hệ",
      cell: ({ row }) => (
        <div className="min-w-0 text-sm">
          <p className="max-w-56 truncate leading-5 font-medium text-foreground">
            {row.original.representativeName || "--"}
          </p>
          <p className="text-xs leading-5 text-muted-foreground">
            {row.original.email || "--"}
          </p>
        </div>
      ),
    },
    {
      id: "supplierPhone",
      accessorKey: "phoneNumber",
      header: "Điện thoại",
      cell: ({ row }) => (
        <span className="block max-w-36 truncate text-sm font-semibold text-foreground">
          {row.original.phoneNumber || "--"}
        </span>
      ),
    },
    {
      id: "supplierStatus",
      header: "Trạng thái",
      cell: () => <SupplierStatusBadge />,
    },
    {
      id: "actions",
      header: () => <span className="block text-right">Thao tác</span>,
      cell: ({ row }) => (
        <div className="flex justify-end gap-1.5 text-muted-foreground">
          <ViewSupplierButton supplier={row.original} />
          <EditSupplierLink supplier={row.original} />
          <DeleteSupplierPopover supplier={row.original} />
        </div>
      ),
    },
  ]
}

function SupplierLogo({ supplier }: { supplier: Supplier }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded border border-primary/10 bg-primary-fixed text-[0.625rem] leading-3 font-bold text-primary uppercase">
      {getNameInitials(supplier.name)}
    </span>
  )
}

function ViewSupplierButton({ supplier }: { supplier: Supplier }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          disabled
          aria-label={`Xem ${supplier.name}`}
          className="border-primary/20 text-primary hover:bg-primary/5 hover:text-primary"
        >
          <Eye />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Chưa có trang chi tiết</TooltipContent>
    </Tooltip>
  )
}

function EditSupplierLink({ supplier }: { supplier: Supplier }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label={`Chỉnh sửa ${supplier.name}`}
          className="border-primary/20 text-primary hover:bg-primary/5 hover:text-primary"
        >
          <Link href={`/manage/suppliers/${supplier.id}/edit` as Route}>
            <Pencil />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Chỉnh sửa</TooltipContent>
    </Tooltip>
  )
}

function SupplierStatusBadge() {
  return (
    <span
      className={cn(
        "inline-flex max-w-36 items-center justify-center rounded px-3 py-1 text-center text-xs leading-4 font-semibold",
        "bg-success-container/80 text-success ring-1 ring-success/15"
      )}
    >
      Đang hoạt động
    </span>
  )
}
