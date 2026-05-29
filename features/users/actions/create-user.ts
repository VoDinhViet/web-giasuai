"use server"

import { api } from "@/lib/api"
import { createUserSchema, type CreateUserInput } from "../schemas/user.schema"
import type { User } from "../types"

export async function createUser(input: CreateUserInput): Promise<User> {
  const reqDto = createUserSchema.parse(input)

  return api<User>("/api/users", {
    method: "POST",
    body: {
      email: reqDto.email,
      password: reqDto.password,
      fullName: reqDto.fullName,
      phoneNumber: reqDto.phoneNumber,
      position: reqDto.position,
      status: reqDto.status,
    },
  })
}
