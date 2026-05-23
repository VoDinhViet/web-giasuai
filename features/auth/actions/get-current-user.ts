"use server"

import { api } from "@/lib/api"
import { getSession } from "@/lib/session"
import type { ActionResponse } from "@/types/api"
import type { User } from "@/types/user"

export async function getCurrentUser(): Promise<ActionResponse<User>> {
  const session = await getSession()

  if (!session.accessToken) {
    return {
      success: false,
      message: "Chưa đăng nhập.",
    }
  }

  try {
    const currentUser = await api<User>("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    return {
      success: true,
      data: currentUser,
    }
  } catch (currentUserError) {
    console.error("Get current user error:", currentUserError)

    return {
      success: false,
      message: "Không thể tải thông tin người dùng.",
    }
  }
}
