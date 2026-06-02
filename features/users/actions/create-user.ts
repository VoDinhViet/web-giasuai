"use server"

import { api } from "@/lib/api"
import { createUserSchema, type CreateUserInput } from "../schemas/user.schema"
import type { User } from "../types"
import { revalidateUsersCache } from "../utils/user-cache.util"

export async function createUser(input: CreateUserInput): Promise<User> {
  const reqDto = createUserSchema.parse(input)

  const user = await api<User>("/api/users", {
    method: "POST",
    body: {
      email: reqDto.email,
      password: reqDto.password,
      fullName: reqDto.fullName,
      dateOfBirth: reqDto.dateOfBirth || undefined,
      gender: reqDto.gender || undefined,
      roleId: reqDto.roleId,
      status: reqDto.status,
    },
  })

  revalidateUsersCache()

  return user
}
