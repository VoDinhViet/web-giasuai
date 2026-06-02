"use server"

import { api } from "@/lib/api"
import { updateUserSchema, type UpdateUserInput } from "../schemas/user.schema"
import type { User } from "../types"
import { revalidateUsersCache } from "../utils/user-cache.util"

export async function updateUser(
  userId: string,
  input: UpdateUserInput
): Promise<User> {
  const reqDto = updateUserSchema.parse(input)

  const user = await api<User>(`/api/users/${userId}`, {
    method: "PATCH",
    body: {
      email: reqDto.email,
      fullName: reqDto.fullName,
      phoneNumber: reqDto.phoneNumber,
      dateOfBirth: reqDto.dateOfBirth || undefined,
      gender: reqDto.gender || undefined,
      roleId: reqDto.roleId,
      status: reqDto.status,
    },
  })

  revalidateUsersCache()

  return user
}
