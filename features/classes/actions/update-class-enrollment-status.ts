"use server"

import { api } from "@/lib/api"
import type { ActionResponse } from "@/types/api"
import type { ClassEnrollment, ClassEnrollmentStatus } from "../types"

type UpdateClassEnrollmentStatusInput = {
  classCode: string
  enrollmentId: string
  status: ClassEnrollmentStatus
}

export async function updateClassEnrollmentStatus({
  classCode,
  enrollmentId,
  status,
}: UpdateClassEnrollmentStatusInput): Promise<ActionResponse<ClassEnrollment>> {
  try {
    const enrollment = await api<ClassEnrollment>(
      `/api/v1/classes/${classCode}/enrollments/${enrollmentId}/status`,
      {
        method: "PATCH",
        body: { status },
      }
    )

    return {
      success: true,
      data: enrollment,
    }
  } catch (updateClassEnrollmentStatusError) {
    console.error(
      "Update class enrollment status error:",
      updateClassEnrollmentStatusError
    )

    return {
      success: false,
      message: "Không thể cập nhật yêu cầu ghi danh. Vui lòng thử lại.",
    }
  }
}
