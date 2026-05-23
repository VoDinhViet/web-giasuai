"use server"

import { api } from "@/lib/api"
import type { User } from "../types"

export async function toggleUserStatus(
  userId: string,
  currentStatus?: string
): Promise<User> {
  return api<User>(`/api/users/${userId}`, {
    method: "PATCH",
    body: {
      status: currentStatus === "active" ? "locked" : "active",
    },
  })
}
