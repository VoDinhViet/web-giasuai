"use server"

import { revalidatePath } from "next/cache"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import type { ActionResponse } from "@/types/api"
import {
  addClassCourseSchema,
  type AddClassCourseInput,
  type AddClassCourseReqDto,
} from "../schemas/class.schema"

type AddClassCourseParams = {
  classCode: string
  input: AddClassCourseInput
}

export async function addClassCourse({
  classCode,
  input,
}: AddClassCourseParams): Promise<ActionResponse> {
  try {
    const reqDto: AddClassCourseReqDto = addClassCourseSchema.parse(input)

    await api(`/api/v1/classes/${classCode}/courses`, {
      method: "POST",
      body: omitEmptyFields({ ...reqDto }),
    })

    revalidatePath("/manage/classes")
    revalidatePath(`/manage/classes/${classCode}`)

    return {
      success: true,
      message: "Đã thêm khóa học vào lớp.",
    }
  } catch (addClassCourseError) {
    console.error("Add class course error:", addClassCourseError)

    return {
      success: false,
      message: "Không thể thêm khóa học vào lớp. Vui lòng thử lại.",
    }
  }
}
