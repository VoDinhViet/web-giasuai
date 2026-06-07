"use server"

import { revalidateTag } from "next/cache"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import type { ActionResponse } from "@/types/api"
import {
  assignClassCourseSchema,
  type AssignClassCourseInput,
  type AssignClassCourseReqDto,
} from "../schemas/class.schema"
import {
  classesCacheTag,
  classDetailCacheTag,
} from "../utils/class-cache.util"

type AssignClassCourseParams = {
  classCode: string
  input: AssignClassCourseInput
}

export async function assignClassCourse({
  classCode,
  input,
}: AssignClassCourseParams): Promise<ActionResponse> {
  try {
    const reqDto: AssignClassCourseReqDto = assignClassCourseSchema.parse(input)

    await api(`/api/v1/classes/${classCode}/courses`, {
      method: "POST",
      body: omitEmptyFields({ ...reqDto }),
    })

    revalidateTag(classesCacheTag, { expire: 0 })
    revalidateTag(classDetailCacheTag(classCode), { expire: 0 })

    return {
      success: true,
      message: "Đã gán khóa học vào lớp.",
    }
  } catch (assignClassCourseError) {
    console.error("Assign class course error:", assignClassCourseError)

    return {
      success: false,
      message: "Không thể gán khóa học vào lớp. Vui lòng thử lại.",
    }
  }
}
