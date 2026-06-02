import { getOrderFormOptions } from "@/features/orders/actions/get-order-form-options"
import { getOrder } from "@/features/orders/actions/get-order"
import { OrderDetailPage } from "@/features/orders/components/order-detail-page"

export const dynamic = "force-dynamic"

export default async function OrderDetailRoute({
  params,
}: PageProps<"/manage/orders/[orderId]">) {
  const { orderId } = await params
  const [order, formOptions] = await Promise.all([
    getOrder(orderId),
    getOrderFormOptions(),
  ])

  return <OrderDetailPage order={order} formOptions={formOptions} />
}
