import { z } from "zod"

export const assignClassCourseSchema = z.object({
  courseId: z
    .string()
    .min(1, { message: "Vui lòng chọn khóa học" })
    .uuid({ message: "Khóa học không hợp lệ" }),
  required: z.boolean(),
})

export type AssignClassCourseInput = z.input<typeof assignClassCourseSchema>
export type AssignClassCourseReqDto = z.output<typeof assignClassCourseSchema>
