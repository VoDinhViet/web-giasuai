"use server"

import { api } from "@/lib/api"
import type { User } from "@/features/users/types"

export async function getUser(userId: string): Promise<User> {
  return api<User>(`/api/v1/users/${userId}`)
}
