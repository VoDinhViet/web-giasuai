import Link from "next/link"
import type { Route } from "next"
import { ShoppingCart } from "lucide-react"

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
import type { Pagination } from "@/types/api"
import type { Order, OrderFormOptions } from "../types"
import { OrdersTable } from "./orders-table"

type OrdersPageProps = {
  formOptions: OrderFormOptions
  orders: Order[]
  pagination: Pagination
}

export function OrdersPage({
  formOptions,
  orders,
  pagination,
}: OrdersPageProps) {
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
              <BreadcrumbPage>Quản lý đơn hàng</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PageTitleBar
          title="Danh sách đơn hàng"
          actions={
            <Button asChild type="button" size="lg">
              <Link href={"/manage/orders/create" as Route}>
                <ShoppingCart className="size-4" />
                Tạo đơn hàng
              </Link>
            </Button>
          }
        />
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          Theo dõi PO khách hàng, ngày giao, trạng thái duyệt và giá trị đơn
          hàng. Đơn mới được chuyển vào trạng thái chờ duyệt để Giám đốc xác
          nhận trước khi sản xuất tiếp nhận.
        </p>
      </div>

      <OrdersTable
        formOptions={formOptions}
        orders={orders}
        pagination={pagination}
      />
    </div>
  )
}
