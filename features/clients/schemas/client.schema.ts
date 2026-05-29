import { z } from "zod"

import { ClientType } from "../types"

export const clientTypeSchema = z.enum(
  [ClientType.INDIVIDUAL, ClientType.COMPANY],
  {
    message: "Vui lòng chọn loại khách hàng",
  }
)

export const clientFormSchema = z
  .object({
    fullName: z.string().trim().min(1, { message: "Vui lòng nhập họ tên" }),
    email: z.string().trim().email({ message: "Email không hợp lệ" }),
    phoneNumber: z
      .string()
      .trim()
      .min(1, { message: "Vui lòng nhập số điện thoại" }),
    clientType: clientTypeSchema,
    taxCode: z.string().trim(),
    companyName: z.string().trim(),
    address: z.string().trim(),
  })
  .superRefine((value, context) => {
    if (
      value.clientType === ClientType.COMPANY &&
      value.companyName.length === 0
    ) {
      context.addIssue({
        code: "custom",
        path: ["companyName"],
        message: "Vui lòng nhập tên công ty",
      })
    }
  })

export type ClientFormInput = z.infer<typeof clientFormSchema>
