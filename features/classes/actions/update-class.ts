"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import type { ActionResponse } from "@/types/api"
import {
  updateClassSchema,
  type UpdateClassInput,
  type UpdateClassReqDto,
} from "../schemas/class.schema"
import type { ClassDetail } from "../types"

export async function updateClass(
  classCode: string,
  input: UpdateClassInput
): Promise<ActionResponse<ClassDetail>> {
  try {
    const reqDto: UpdateClassReqDto = updateClassSchema.parse(input)
    const updatedClass = await api<ClassDetail>(
      `/api/v1/classes/${classCode}`,
      {
        method: "PATCH",
        body: omitEmptyFields({ ...reqDto }),
      }
    )

    return {
      success: true,
      data: updatedClass,
      message: "Đã cập nhật lớp học.",
    }
  } catch (updateClassError) {
    console.error("Update class error:", updateClassError)

    return {
      success: false,
      message: "Không thể cập nhật lớp học. Vui lòng thử lại.",
    }
  }
}
