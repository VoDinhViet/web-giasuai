"use server"

import { api } from "@/lib/api"
import { createUserSchema, type CreateUserInput } from "../schemas/user.schema"
import type { User } from "../types"
import { revalidateUsersCache } from "../utils/user-cache.util"

export async function createUser(input: CreateUserInput): Promise<User> {
  const reqDto = createUserSchema.parse(input)

  const user = await api<User>("/api/v1/users", {
    method: "POST",
    body: {
      email: reqDto.email,
      username: reqDto.username,
      password: reqDto.password,
      fullName: reqDto.fullName,
      role: reqDto.role,
    },
  })

  revalidateUsersCache()

  return user
}
