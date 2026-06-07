import { z } from "zod"

import { emptyStringToUndefined, isValidUrl } from "./utils"

const classCodeSchema = z
  .string()
  .trim()
  .min(1, { message: "Vui lòng nhập mã lớp" })
  .max(32, { message: "Mã lớp tối đa 32 ký tự" })

const classFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Vui lòng nhập tên lớp" }),
  courseId: z.string().uuid({ message: "Khóa học không hợp lệ" }).optional(),
  instructorId: z
    .string()
    .min(1, { message: "Vui lòng chọn giáo viên" })
    .uuid({ message: "Giáo viên không hợp lệ" }),
  maxStudents: z
    .number()
    .int({ message: "Sĩ số phải là số nguyên" })
    .min(1, { message: "Sĩ số tối thiểu là 1" })
    .max(500, { message: "Sĩ số tối đa là 500" }),
  meetingUrl: z
    .string()
    .trim()
    .max(500, { message: "Link học tối đa 500 ký tự" })
    .refine(isValidUrl, { message: "Link học không hợp lệ" })
    .transform(emptyStringToUndefined),
  startDate: z.string().transform(emptyStringToUndefined),
  endDate: z.string().transform(emptyStringToUndefined),
  startTime: z.string().min(1, { message: "Vui lòng chọn giờ bắt đầu" }),
  endTime: z.string().min(1, { message: "Vui lòng chọn giờ kết thúc" }),
  repeatDays: z
    .array(
      z.enum([
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ])
    )
    .min(1, { message: "Vui lòng chọn ít nhất một ngày học" }),
  status: z.enum(["ACTIVE", "UPCOMING", "COMPLETED", "PAUSED"], {
    message: "Vui lòng chọn trạng thái",
  }),
  format: z.enum(["OFFLINE", "ONLINE", "HYBRID"], {
    message: "Vui lòng chọn hình thức học",
  }),
  joinPolicy: z.enum(["INVITE_ONLY", "REQUEST_APPROVAL", "OPEN"], {
    message: "Vui lòng chọn cách ghi danh",
  }),
  waitlistEnabled: z.boolean(),
  reminderEnabled: z.boolean(),
  autoCreateSessions: z.boolean(),
  note: z
    .string()
    .trim()
    .max(1000, { message: "Ghi chú tối đa 1000 ký tự" })
    .transform(emptyStringToUndefined),
})

export const createClassSchema = classFormSchema
  .omit({ courseId: true })
  .refine(hasValidDateRange, {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["endDate"],
  })
  .refine(hasValidTimeRange, {
    message: "Giờ kết thúc phải sau giờ bắt đầu",
    path: ["endTime"],
  })

export const updateClassSchema = classFormSchema
  .extend({
    code: classCodeSchema,
  })
  .refine(hasValidDateRange, {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["endDate"],
  })
  .refine(hasValidTimeRange, {
    message: "Giờ kết thúc phải sau giờ bắt đầu",
    path: ["endTime"],
  })

type ClassScheduleValues = {
  endDate?: string
  endTime?: string
  startDate?: string
  startTime?: string
}

function hasValidDateRange(values: ClassScheduleValues) {
  return (
    !values.startDate ||
    !values.endDate ||
    new Date(values.startDate) <= new Date(values.endDate)
  )
}

function hasValidTimeRange(values: ClassScheduleValues) {
  return (
    !values.startTime || !values.endTime || values.startTime < values.endTime
  )
}

export type CreateClassInput = z.input<typeof createClassSchema>
export type CreateClassReqDto = z.output<typeof createClassSchema>
export type UpdateClassInput = z.input<typeof updateClassSchema>
export type UpdateClassReqDto = z.output<typeof updateClassSchema>
