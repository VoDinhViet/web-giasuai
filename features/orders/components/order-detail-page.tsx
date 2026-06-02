import Link from "next/link"
import type { Route } from "next"
import { ArrowLeft, FileText, ImageIcon, Pencil } from "lucide-react"

import { PageTitleBar } from "@/components/page-title-bar"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { resolveApiAssetUrl } from "@/lib/asset-url"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/date.util"
import { formatCurrency, formatNumber } from "@/lib/number.util"
import { OrderStatus, type Order, type OrderFormOptions } from "../types"
import { ApproveOrderButton } from "./order-approval-actions"
import { EditOrderDialog } from "./edit-order-dialog"
import { OrderDeleteDialog } from "./order-delete-dialog"
import { OrderPdfFilesCard } from "./order-pdf-files-card"
import { OrderStatusBadge } from "./orders-table-columns"
import { RejectOrderDialog } from "./reject-order-dialog"

type OrderDetailPageProps = {
  formOptions: OrderFormOptions
  order: Order
}

export function OrderDetailPage({ formOptions, order }: OrderDetailPageProps) {
  const ordersRoute = "/manage/orders" as Route
  const canEdit =
    order.status === OrderStatus.PENDING_APPROVAL ||
    order.status === OrderStatus.REJECTED
  const canApprove = order.status === OrderStatus.PENDING_APPROVAL

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList className="font-medium">
            <BreadcrumbItem>
              <BreadcrumbLink href="/manage/orders">Đơn hàng</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{order.code}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PageTitleBar
          title={`Đơn hàng ${order.code}`}
          actions={
            <>
              <Button asChild variant="outline">
                <Link href={ordersRoute}>
                  <ArrowLeft className="size-4" />
                  Quay lại
                </Link>
              </Button>
              <EditOrderDialog
                order={order}
                formOptions={formOptions}
                disabled={!canEdit}
                trigger={
                  <Button type="button" variant="outline" disabled={!canEdit}>
                    <Pencil className="size-4" />
                    Chỉnh sửa
                  </Button>
                }
              />
              <ApproveOrderButton order={order} disabled={!canApprove} />
              <RejectOrderDialog order={order} disabled={!canApprove} />
              <OrderDeleteDialog
                order={order}
                disabled={!canEdit}
                redirectTo={ordersRoute}
              />
            </>
          }
        />
        <div className="flex flex-wrap items-center gap-3">
          <OrderStatusBadge status={order.status} />
          {order.rejectedReason ? (
            <p className="text-sm text-destructive">
              Lý do từ chối: {order.rejectedReason}
            </p>
          ) : null}
        </div>
      </div>

      <OrderSummaryCard order={order} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <OrderItemsCard order={order} />
        <OrderPdfFilesCard order={order} editable={canEdit} />
      </div>
    </div>
  )
}

function OrderSummaryCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardContent className="grid gap-x-16 gap-y-7 p-6 md:grid-cols-2 xl:grid-cols-4">
        <SummaryRow label="Mã đơn hàng (PO)" value={order.code} strong />
        <SummaryRow label="Khách hàng" value={order.client.fullName} strong />
        <SummaryRow label="Số PR" value={order.prNumber} />
        <SummaryRow
          label="Ngày giao dự kiến"
          value={formatDate(order.dueDate)}
        />
        <SummaryRow label="Công ty" value={order.client.companyName} />
        <SummaryRow label="Mã số thuế" value={order.client.taxCode} />
        <SummaryRow label="Số điện thoại" value={order.client.phoneNumber} />
        <SummaryRow label="Địa chỉ" value={order.client.address} />
        <SummaryRow
          label="Ghi chú"
          value={order.note}
          className="md:col-span-2"
        />
        <div className="grid gap-2 rounded-md border border-border/70 bg-muted/20 p-3 md:col-span-2 xl:col-span-2">
          <MoneyRow label="Tổng tiền" value={order.subTotal} />
          <MoneyRow label={`VAT ${order.vatRate}%`} value={order.vatAmount} />
          <MoneyRow label="Tổng sau VAT" value={order.totalAfterVat} strong />
        </div>
      </CardContent>
    </Card>
  )
}

function OrderItemsCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader className="border-b border-border/70">
        <div className="border-l-4 border-primary pl-4">
          <CardTitle>Thông tin thành phẩm</CardTitle>
          <CardDescription className="mt-1">
            Danh sách thành phẩm theo PO, số lượng đặt hàng và file kỹ thuật
            được chuyển cho sản xuất.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0">
        <Table className="min-w-210">
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-5">Hình</TableHead>
              <TableHead>Mã</TableHead>
              <TableHead>Tên thành phẩm</TableHead>
              <TableHead>SL</TableHead>
              <TableHead>ĐV</TableHead>
              <TableHead>Đơn giá</TableHead>
              <TableHead>Thành tiền</TableHead>
              <TableHead>File kỹ thuật</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((orderItem) => (
              <TableRow key={orderItem.id} className="hover:bg-muted/25">
                <TableCell className="px-5">
                  <OrderItemImage
                    imageUrl={orderItem.imageUrl}
                    name={orderItem.productName}
                  />
                </TableCell>
                <TableCell className="font-semibold text-foreground">
                  {orderItem.productCode}
                </TableCell>
                <TableCell className="max-w-72 truncate font-medium text-foreground">
                  {orderItem.productName}
                </TableCell>
                <TableCell>{formatNumber(orderItem.quantity)}</TableCell>
                <TableCell>{orderItem.unit}</TableCell>
                <TableCell>{formatCurrency(orderItem.unitPrice)}</TableCell>
                <TableCell className="font-semibold text-foreground">
                  {formatCurrency(orderItem.lineTotal)}
                </TableCell>
                <TableCell>
                  <TechnicalFileLinks files={orderItem.technicalFiles} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function TechnicalFileLinks({
  files,
}: {
  files: Order["items"][number]["technicalFiles"]
}) {
  if (!files.length) {
    return <span className="text-sm text-muted-foreground">--</span>
  }

  return (
    <div className="flex max-w-64 flex-wrap gap-2">
      {files.slice(0, 3).map((file) => {
        const fileUrl = resolveApiAssetUrl(file.url)

        return (
          <a
            key={file.id}
            href={fileUrl ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex max-w-48 items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground hover:text-primary"
          >
            <FileText className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">{file.originalName}</span>
          </a>
        )
      })}
      {files.length > 3 ? (
        <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
          +{files.length - 3}
        </span>
      ) : null}
    </div>
  )
}

function OrderItemImage({
  imageUrl,
  name,
}: {
  imageUrl: string | null
  name: string
}) {
  const imageSrc = resolveApiAssetUrl(imageUrl)

  return (
    <div className="flex size-11 items-center justify-center overflow-hidden rounded-md border border-border bg-background text-muted-foreground">
      {imageSrc ? (
        <span
          aria-label={name}
          className="size-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      ) : (
        <ImageIcon className="size-4" />
      )}
    </div>
  )
}

function SummaryRow({
  className,
  label,
  strong = false,
  value,
}: {
  className?: string
  label: string
  strong?: boolean
  value?: string | null
}) {
  return (
    <div className={cn("grid min-w-0 content-start gap-1", className)}>
      <dt className="text-[10px] leading-4 font-semibold tracking-[0.08em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd
        className={cn(
          "min-h-5 text-sm whitespace-pre-wrap text-foreground",
          strong && "font-semibold"
        )}
      >
        {value || "--"}
      </dd>
    </div>
  )
}

function MoneyRow({
  label,
  strong = false,
  value,
}: {
  label: string
  strong?: boolean
  value: number
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span
        className={
          strong ? "font-semibold text-foreground" : "text-muted-foreground"
        }
      >
        {label}
      </span>
      <span className="font-semibold text-foreground">
        {formatCurrency(value)}
      </span>
    </div>
  )
}
