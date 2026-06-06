"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import type { ActionResponse } from "@/types/api"
import {
  profileFormSchema,
  type ProfileFormInput,
} from "../schemas/profile.schema"
import type { User } from "../types"
import { revalidateUsersCache } from "../utils/user-cache.util"

export async function updateUser(
  userId: string,
  input: ProfileFormInput
): Promise<ActionResponse<User>> {
  try {
    const reqDto = profileFormSchema.parse(input)

    const user = await api<User>(`/api/v1/users/${userId}`, {
      method: "PATCH",
      body: omitEmptyFields({
        fullName: reqDto.fullName,
        phone: reqDto.phone,
        location: reqDto.location,
        bio: reqDto.bio,
      }),
    })

    revalidateUsersCache()

    return {
      success: true,
      data: user,
      message: "Đã cập nhật người dùng.",
    }
  } catch (updateUserError) {
    console.error("Update user error:", updateUserError)

    return {
      success: false,
      message: "Không thể cập nhật người dùng.",
    }
  }
}
