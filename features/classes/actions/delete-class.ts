"use server"

import { api } from "@/lib/api"
import type { ActionResponse } from "@/types/api"

export async function deleteClass(
  classCode: string
): Promise<ActionResponse<{ classCode: string }>> {
  try {
    await api(`/api/v1/classes/${classCode}`, {
      method: "DELETE",
    })

    return {
      success: true,
      data: { classCode },
      message: "Đã xóa lớp học.",
    }
  } catch (deleteClassError) {
    console.error("Delete class error:", deleteClassError)

    return {
      success: false,
      message: "Không thể xóa lớp học. Vui lòng thử lại.",
    }
  }
}
