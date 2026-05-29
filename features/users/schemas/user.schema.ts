import { z } from "zod"

import { UserGender, UserStatus } from "../types"

export const userGenderSchema = z.enum(
  [UserGender.MALE, UserGender.FEMALE, UserGender.OTHER],
  {
  message: "Vui lòng chọn giới tính",
  }
)

export const userStatusSchema = z.enum(
  [UserStatus.ACTIVE, UserStatus.INACTIVE],
  {
    message: "Vui lòng chọn trạng thái",
  }
)

export const createUserSchema = z.object({
  fullName: z.string().trim().min(1, { message: "Vui lòng nhập họ tên" }),
  email: z.string().trim().email({ message: "Email không hợp lệ" }),
  password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập số điện thoại" }),
  dateOfBirth: z.string().trim().optional(),
  gender: z.union([userGenderSchema, z.literal("")]).optional(),
  roleId: z.string().trim().uuid({ message: "Vui lòng chọn vai trò" }),
  status: userStatusSchema,
})

export const updateUserSchema = z.object({
  email: z.string().trim().email({ message: "Email không hợp lệ" }),
  fullName: z.string().trim().min(1, { message: "Vui lòng nhập họ tên" }),
  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập số điện thoại" }),
  dateOfBirth: z.string().trim(),
  gender: z.union([userGenderSchema, z.literal("")]),
  roleId: z.string().trim().uuid({ message: "Role ID không hợp lệ" }),
  status: userStatusSchema,
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
