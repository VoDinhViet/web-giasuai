"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import type { ActionResponse } from "@/types/api"
import {
  inviteUserToClassSchema,
  type InviteUserToClassInput,
  type InviteUserToClassReqDto,
} from "../schemas/class.schema"
import type { ClassEnrollment } from "../types"

type InviteUserToClassParams = {
  classCode: string
  input: InviteUserToClassInput
}

export async function inviteUserToClass({
  classCode,
  input,
}: InviteUserToClassParams): Promise<ActionResponse<ClassEnrollment>> {
  try {
    const reqDto: InviteUserToClassReqDto =
      inviteUserToClassSchema.parse(input)
    const enrollment = await api<ClassEnrollment>(
      `/api/v1/classes/${classCode}/enrollments/invite`,
      {
        method: "POST",
        body: omitEmptyFields({ ...reqDto }),
      }
    )

    return {
      success: true,
      data: enrollment,
      message: "Đã gửi lời mời vào lớp.",
    }
  } catch (inviteUserToClassError) {
    console.error("Invite user to class error:", inviteUserToClassError)

    return {
      success: false,
      message: "Không thể gửi lời mời. Vui lòng thử lại.",
    }
  }
}
