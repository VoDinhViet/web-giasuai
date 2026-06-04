import Link from "next/link"
import type { Route } from "next"
import { ShoppingCart } from "lucide-react"

import { PageTitleBar } from "@/components/page-title-bar"
import { Button } from "@/components/ui/button"
import { getOrderFormOptions } from "@/features/orders/actions/get-order-form-options"
import { getOrders } from "@/features/orders/actions/get-orders"
import { OrdersPage } from "@/features/orders/components/pages/orders-page"
import { loadOrdersSearchParams } from "@/features/orders/lib/load-orders-search-params"

export const dynamic = "force-dynamic"

export default async function OrdersRoute({
  searchParams,
}: PageProps<"/manage/orders">) {
  const ordersSearchParams = await loadOrdersSearchParams(searchParams)
  const [{ data: orders, pagination }, formOptions] = await Promise.all([
    getOrders(ordersSearchParams),
    getOrderFormOptions(),
  ])

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitleBar
        title="Quản lý đơn hàng"
        actions={
          <Button asChild type="button" size="lg">
            <Link href={"/manage/orders/create" as Route}>
              <ShoppingCart className="size-4" />
              Tạo đơn hàng
            </Link>
          </Button>
        }
        breadcrumbItems={[
          { label: "Bảng điều khiển", href: "/manage/orders" },
          { label: "Bán hàng" },
          { label: "Đơn hàng" },
        ]}
      />
      <OrdersPage
        orders={orders}
        pagination={pagination}
        formOptions={formOptions}
      />
    </div>
  )
}
