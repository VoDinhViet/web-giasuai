"use server"

import { api } from "@/lib/api"
import type { CreateUserInput } from "../schemas/user.schema"
import type { User } from "../types"

export async function createUser(input: CreateUserInput): Promise<User> {
  return api<User>("/api/users", {
    method: "POST",
    body: {
      email: input.email,
      password: "User@123456",
      fullName: input.fullName,
      status: input.status,
    },
  })
}
