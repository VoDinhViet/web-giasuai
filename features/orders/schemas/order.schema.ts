import { z } from "zod"

import { OrderStatus } from "../types"

export const orderStatusSchema = z.enum([
  OrderStatus.PENDING_APPROVAL,
  OrderStatus.APPROVED,
  OrderStatus.REJECTED,
  OrderStatus.CANCELLED,
])

export const orderFormSchema = z.object({
  clientId: z.string().trim().min(1, { message: "Vui lòng chọn khách hàng" }),
  code: z.string().trim().min(1, { message: "Vui lòng nhập mã PO" }),
  prNumber: z.string().trim().min(1, { message: "Vui lòng nhập số PR" }),
  dueDate: z.string().trim().min(1, { message: "Vui lòng chọn ngày giao" }),
  vatRate: z
    .number()
    .int()
    .refine((value) => [0, 5, 8, 10].includes(value), {
      message: "VAT phải là 0%, 5%, 8% hoặc 10%",
    }),
  note: z.string().trim(),
  items: z
    .array(
      z.object({
        productId: z
          .string()
          .trim()
          .min(1, { message: "Vui lòng chọn thành phẩm" }),
        unit: z.string().trim().min(1, { message: "Vui lòng nhập đơn vị" }),
        quantity: z.number().positive({ message: "Số lượng phải lớn hơn 0" }),
      })
    )
    .min(1, { message: "Vui lòng thêm ít nhất một dòng thành phẩm" }),
})

export type OrderFormInput = z.infer<typeof orderFormSchema>

export const rejectOrderFormSchema = z.object({
  rejectedReason: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập lý do từ chối" }),
})

export type RejectOrderFormInput = z.infer<typeof rejectOrderFormSchema>
