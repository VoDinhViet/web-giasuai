"use server"

import { z } from "zod"

import { api } from "@/lib/api"
import type { ActionResponse } from "@/types/api"
import type { User } from "@/features/users/types"

const updateCurrentUserSchema = z.object({
  fullName: z.string().trim().min(2, { message: "Họ tên phải có ít nhất 2 ký tự" }).max(120),
  phone: z.string().trim().max(32).optional(),
  location: z.string().trim().max(160).optional(),
  bio: z.string().trim().max(1000).optional(),
  avatarUrl: z.string().trim().max(1000).optional(),
})

export async function updateCurrentUser(input: {
  fullName: string
  phone?: string
  location?: string
  bio?: string
  avatarUrl?: string
}): Promise<ActionResponse<User>> {
  try {
    const reqDto = updateCurrentUserSchema.parse(input)
    const user = await api<User>("/api/v1/users/me", {
      method: "PATCH",
      body: reqDto,
    })

    return {
      success: true,
      data: user,
      message: "Đã cập nhật hồ sơ.",
    }
  } catch (updateCurrentUserError) {
    console.error("Update current user error:", updateCurrentUserError)

    return {
      success: false,
      message: "Không thể cập nhật hồ sơ. Vui lòng thử lại.",
    }
  }
}
