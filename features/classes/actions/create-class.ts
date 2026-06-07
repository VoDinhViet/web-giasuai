"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import type { ActionResponse } from "@/types/api"
import {
  createClassSchema,
  type CreateClassInput,
  type CreateClassReqDto,
} from "../schemas/class.schema"
import type { Class } from "../types"

export async function createClass(
  input: CreateClassInput
): Promise<ActionResponse<Class>> {
  try {
    const reqDto: CreateClassReqDto = createClassSchema.parse(input)
    const createdClass = await api<Class>("/api/v1/classes", {
      method: "POST",
      body: omitEmptyFields({ ...reqDto }),
    })

    return {
      success: true,
      data: createdClass,
      message: "Đã tạo lớp học.",
    }
  } catch (createClassError) {
    console.error("Create class error:", createClassError)

    return {
      success: false,
      message: "Không thể tạo lớp học. Vui lòng thử lại.",
    }
  }
}
