"use server"

import { api } from "@/lib/api"
import { UserStatus, type User } from "../types"
import { revalidateUsersCache } from "../utils/user-cache.util"

export async function toggleUserStatus(
  userId: string,
  currentStatus?: UserStatus
): Promise<User> {
  const user = await api<User>(`/api/users/${userId}`, {
    method: "PATCH",
    body: {
      status:
        currentStatus === UserStatus.ACTIVE
          ? UserStatus.INACTIVE
          : UserStatus.ACTIVE,
    },
  })

  revalidateUsersCache()

  return user
}
