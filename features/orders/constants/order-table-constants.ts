import { createSelectOptionsFromLabelMap } from "@/lib/select-option.util"
import { OrderStatus } from "../types"

export const orderStatusLabel: Record<OrderStatus, string> = {
  [OrderStatus.PENDING_APPROVAL]: "Chờ duyệt",
  [OrderStatus.APPROVED]: "Đã duyệt",
  [OrderStatus.REJECTED]: "Từ chối",
  [OrderStatus.CANCELLED]: "Đã hủy",
}

export const orderStatusOptions =
  createSelectOptionsFromLabelMap(orderStatusLabel)
