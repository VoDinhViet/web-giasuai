import { z } from "zod"

import { UserRole } from "@/features/users/types"

export const userRoleSchema = z.enum(
  [UserRole.ADMIN, UserRole.STUDENT, UserRole.TEACHER],
  {
    message: "Vui lòng chọn vai trò",
  }
)

export const createUserSchema = z.object({
  fullName: z.string().trim().min(1, { message: "Vui lòng nhập họ tên" }),
  email: z.string().trim().email({ message: "Email không hợp lệ" }),
  username: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập tên đăng nhập" }),
  password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
  role: userRoleSchema,
})

export const updateUserSchema = z.object({
  email: z.string().trim().email({ message: "Email không hợp lệ" }),
  username: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập tên đăng nhập" }),
  fullName: z.string().trim().min(1, { message: "Vui lòng nhập họ tên" }),
  password: z
    .string()
    .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
    .or(z.literal("")),
  role: userRoleSchema,
  isLocked: z.boolean(),
  phone: z.string().trim().max(32).optional(),
  location: z.string().trim().max(160).optional(),
  bio: z.string().trim().max(1000).optional(),
  avatarUrl: z.string().trim().max(1000).optional(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
