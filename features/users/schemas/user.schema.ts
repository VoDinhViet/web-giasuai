import { z } from "zod"

export const userGenderSchema = z.enum(["male", "female", "other"], {
  message: "Vui lòng chọn giới tính",
})

export const userStatusSchema = z.enum(["active", "locked"], {
  message: "Vui lòng chọn trạng thái",
})

export const createUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập họ tên" }),
  email: z
    .string()
    .trim()
    .email({ message: "Email không hợp lệ" }),
  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập số điện thoại" }),
  position: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng chọn chức vụ" }),
  status: userStatusSchema,
})

export type CreateUserInput = z.infer<typeof createUserSchema>
