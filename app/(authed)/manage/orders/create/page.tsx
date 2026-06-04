import { getOrderFormOptions } from "@/features/orders/actions/get-order-form-options"
import { CreateOrderPage } from "@/features/orders/components/pages/create-order-page"

export const dynamic = "force-dynamic"

export default async function CreateOrderRoute() {
  const formOptions = await getOrderFormOptions()

  return <CreateOrderPage formOptions={formOptions} />
}
