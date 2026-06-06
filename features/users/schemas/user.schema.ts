import { z } from "zod"

import { UserRole } from "@/features/users/types"

export const userRoleSchema = z.enum(
  [UserRole.ADMIN, UserRole.LEARNER, UserRole.INSTRUCTOR],
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

export type CreateUserInput = z.infer<typeof createUserSchema>
