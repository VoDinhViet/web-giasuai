import { getOrderFormOptions } from "@/features/orders/actions/get-order-form-options"
import { getOrders } from "@/features/orders/actions/get-orders"
import { OrdersPage } from "@/features/orders/components/orders-page"
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
    <OrdersPage
      orders={orders}
      pagination={pagination}
      formOptions={formOptions}
    />
  )
}
