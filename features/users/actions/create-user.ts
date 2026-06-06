"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import type { ActionResponse } from "@/types/api"
import { createUserSchema, type CreateUserInput } from "../schemas/user.schema"
import type { User } from "../types"
import { revalidateUsersCache } from "../utils/user-cache.util"

export async function createUser(
  input: CreateUserInput
): Promise<ActionResponse<User>> {
  try {
    const reqDto = createUserSchema.parse(input)

    const user = await api<User>("/api/v1/users", {
      method: "POST",
      body: omitEmptyFields({
        email: reqDto.email,
        username: reqDto.username,
        password: reqDto.password,
        fullName: reqDto.fullName,
        role: reqDto.role,
      }),
    })

    revalidateUsersCache()

    return {
      success: true,
      data: user,
      message: "Đã tạo người dùng.",
    }
  } catch (createUserError) {
    console.error("Create user error:", createUserError)

    return {
      success: false,
      message: "Không thể tạo người dùng.",
    }
  }
}
