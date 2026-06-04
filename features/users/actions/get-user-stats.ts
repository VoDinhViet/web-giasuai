"use server"

import { api } from "@/lib/api"

export type UserStats = {
  total: number
  new: number
  active: number
  locked: number
}

export async function getUserStats(): Promise<UserStats> {
  return api<UserStats>("/api/v1/users/stats")
}
