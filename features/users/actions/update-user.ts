"use server"

import { revalidatePath } from "next/cache"

import { api } from "@/lib/api"
import { updateUserSchema, type UpdateUserInput } from "../schemas/user.schema"
import type { User } from "../types"
import { revalidateUsersCache } from "../utils/user-cache.util"

export async function updateUser(
  userId: string,
  input: UpdateUserInput
): Promise<User> {
  const reqDto = updateUserSchema.parse(input)

  const user = await api<User>(`/api/v1/users/${userId}`, {
    method: "PATCH",
    body: {
      email: reqDto.email,
      username: reqDto.username,
      fullName: reqDto.fullName,
      password: reqDto.password || undefined,
      role: reqDto.role,
      isLocked: reqDto.isLocked,
      phone: reqDto.phone,
      location: reqDto.location,
      bio: reqDto.bio,
      avatarUrl: reqDto.avatarUrl,
    },
  })

  revalidateUsersCache()
  revalidatePath("/manage/users")
  revalidatePath(`/manage/users/${userId}`)

  return user
}
