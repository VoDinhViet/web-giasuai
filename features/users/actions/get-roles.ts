"use server"

import { api } from "@/lib/api"
import type { Role } from "@/types/user"

export async function getRoles(): Promise<Role[]> {
  return api<Role[]>("/api/roles")
}
