"use server"

import { api } from "@/lib/api"
import type { ActionResponse } from "@/types/api"
import type { User } from "../types"
import { revalidateUsersCache } from "../utils/user-cache.util"

export async function toggleUserStatus(
  userId: string
): Promise<ActionResponse<User>> {
  try {
    const user = await api<User>(`/api/v1/users/${userId}/toggle-lock`, {
      method: "PATCH",
    })

    revalidateUsersCache()

    return {
      success: true,
      data: user,
      message: user.isLocked ? "Đã khóa tài khoản." : "Đã mở khóa tài khoản.",
    }
  } catch (toggleUserStatusError) {
    console.error("Toggle user status error:", toggleUserStatusError)

    return {
      success: false,
      message: "Không thể cập nhật trạng thái tài khoản.",
    }
  }
}
