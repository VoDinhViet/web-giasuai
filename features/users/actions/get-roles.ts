"use server"

import { api } from "@/lib/api"
import type { Role } from "@/features/users/types"

export async function getRoles(): Promise<Role[]> {
  return api<Role[]>("/api/roles")
}
