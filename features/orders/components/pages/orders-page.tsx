import type { Pagination } from "@/types/api"
import type { Order, OrderFormOptions } from "../../types"
import { OrdersTable } from "../tables/orders-table"

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
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
        Theo dõi PO khách hàng, ngày giao, trạng thái duyệt và giá trị đơn hàng.
        Đơn mới được chuyển vào trạng thái chờ duyệt để Giám đốc xác nhận trước
        khi sản xuất tiếp nhận.
      </p>

      <OrdersTable
        formOptions={formOptions}
        orders={orders}
        pagination={pagination}
      />
    </div>
  )
}
