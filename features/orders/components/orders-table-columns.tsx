import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import type { Route } from "next"
import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/date.util"
import { formatCurrency } from "@/lib/number.util"
import { orderStatusLabel } from "../constants/order-table-constants"
import { OrderStatus, type Order, type OrderFormOptions } from "../types"
import { EditOrderDialog } from "./edit-order-dialog"
import { OrderDeleteDialog } from "./order-delete-dialog"

type CreateOrdersTableColumnsArgs = {
  formOptions: OrderFormOptions
}

export function createOrdersTableColumns({
  formOptions,
}: CreateOrdersTableColumnsArgs): ColumnDef<Order>[] {
  return [
    {
      id: "client",
      header: "Khách hàng",
      cell: ({ row }) => (
        <div className="min-w-0">
          <p className="max-w-52 truncate text-sm leading-5 font-semibold text-foreground">
            {row.original.client.fullName}
          </p>
          <p className="text-[10px] leading-4 font-medium text-muted-foreground">
            {row.original.client.code}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "code",
      header: "Mã PO",
      cell: ({ row }) => (
        <span className="block max-w-40 truncate text-sm font-semibold text-foreground">
          {row.original.code}
        </span>
      ),
    },
    {
      accessorKey: "prNumber",
      header: "Số PR",
      cell: ({ row }) => (
        <span className="block max-w-36 truncate text-sm text-foreground">
          {row.original.prNumber}
        </span>
      ),
    },
    {
      accessorKey: "dueDate",
      header: "Ngày giao",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-foreground">
          {formatDate(row.original.dueDate)}
        </span>
      ),
    },
    {
      id: "items",
      header: "Thành phẩm",
      cell: ({ row }) => {
        const firstItem = row.original.items[0]

        return (
          <div className="min-w-0">
            <p className="max-w-64 truncate text-sm font-medium text-foreground">
              {firstItem
                ? `${firstItem.productCode} - ${firstItem.productName}`
                : "--"}
            </p>
            <p className="text-[10px] leading-4 text-muted-foreground">
              {row.original.items.length} dòng thành phẩm
            </p>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => <OrderStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "totalAfterVat",
      header: "Tổng sau VAT",
      cell: ({ row }) => (
        <span className="text-sm font-semibold text-foreground">
          {formatCurrency(row.original.totalAfterVat)}
        </span>
      ),
    },
    {
      accessorKey: "note",
      header: "Ghi chú",
      cell: ({ row }) => (
        <span className="block max-w-64 truncate text-sm text-muted-foreground">
          {row.original.note || "--"}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="block text-right">Thao tác</span>,
      cell: ({ row }) => {
        const order = row.original
        const canEdit =
          order.status === OrderStatus.PENDING_APPROVAL ||
          order.status === OrderStatus.REJECTED

        return (
          <div className="flex justify-end gap-1 text-muted-foreground">
            <ViewOrderLink order={order} />
            <EditOrderDialog
              order={order}
              formOptions={formOptions}
              disabled={!canEdit}
            />
            <OrderDeleteDialog order={order} disabled={!canEdit} />
          </div>
        )
      },
    },
  ]
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex max-w-36 items-center justify-center rounded-(--radius) px-3 py-1 text-center text-[10px] leading-4 font-semibold uppercase",
        getStatusBadgeClassName(status)
      )}
    >
      {orderStatusLabel[status]}
    </span>
  )
}

function ViewOrderLink({ order }: { order: Order }) {
  const orderRoute = `/manage/orders/${order.id}` as Route

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant="ghost"
          size="icon-xs"
          aria-label={`Xem ${order.code}`}
          className="text-muted-foreground hover:text-foreground"
        >
          <Link href={orderRoute}>
            <Eye />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Xem đơn hàng</TooltipContent>
    </Tooltip>
  )
}

function getStatusBadgeClassName(status: OrderStatus) {
  switch (status) {
    case OrderStatus.PENDING_APPROVAL:
      return "bg-primary-fixed text-primary"
    case OrderStatus.APPROVED:
      return "bg-success-container/80 text-success ring-1 ring-success/15"
    case OrderStatus.REJECTED:
      return "bg-error-container/50 text-destructive ring-1 ring-destructive/10"
    case OrderStatus.CANCELLED:
      return "bg-muted text-muted-foreground ring-1 ring-border"
  }
}
