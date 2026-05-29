"use server"

import { api } from "@/lib/api"
import { UserStatus, type User } from "../types"
import { normalizeUserStatus } from "../lib/user-input.util"

export async function toggleUserStatus(
  userId: string,
  currentStatus?: UserStatus
): Promise<User> {
  const normalizedStatus = normalizeUserStatus(currentStatus)

  return api<User>(`/api/users/${userId}`, {
    method: "PATCH",
    body: {
      status:
        normalizedStatus === UserStatus.ACTIVE
          ? UserStatus.INACTIVE
          : UserStatus.ACTIVE,
    },
  })
}
