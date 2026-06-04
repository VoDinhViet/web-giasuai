import { z } from "zod"

import type {
  ClassAdmissionMode,
  ClassLearningMode,
  ClassStatus,
  ClassWeekday,
} from "../types"

export const classStatusOptions = [
  { value: "ACTIVE", label: "Đang học" },
  { value: "UPCOMING", label: "Sắp mở" },
  { value: "COMPLETED", label: "Hoàn thành" },
  { value: "PAUSED", label: "Tạm dừng" },
] satisfies Array<{ value: ClassStatus; label: string }>

export const classLearningModeOptions = [
  { value: "OFFLINE", label: "Tại lớp" },
  { value: "ONLINE", label: "Online" },
  { value: "HYBRID", label: "Kết hợp" },
] satisfies Array<{ value: ClassLearningMode; label: string }>

export const classAdmissionModeOptions = [
  { value: "INVITE_ONLY", label: "Chỉ mời vào lớp" },
  { value: "REQUEST_APPROVAL", label: "Duyệt yêu cầu" },
  { value: "OPEN", label: "Mở tự đăng ký" },
] satisfies Array<{ value: ClassAdmissionMode; label: string }>

export const classWeekdayOptions = [
  { value: "MONDAY", label: "T2" },
  { value: "TUESDAY", label: "T3" },
  { value: "WEDNESDAY", label: "T4" },
  { value: "THURSDAY", label: "T5" },
  { value: "FRIDAY", label: "T6" },
  { value: "SATURDAY", label: "T7" },
  { value: "SUNDAY", label: "CN" },
] satisfies Array<{ value: ClassWeekday; label: string }>

function emptyStringToUndefined(value: string) {
  return value || undefined
}

function isValidUrl(value: string) {
  if (!value) return true

  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export const createClassSchema = z
  .object({
    code: z
      .string()
      .trim()
      .min(1, { message: "Vui lòng nhập mã lớp" })
      .max(32, { message: "Mã lớp tối đa 32 ký tự" }),
    name: z.string().trim().min(1, { message: "Vui lòng nhập tên lớp" }),
    courseId: z.string().uuid({ message: "Khóa học không hợp lệ" }).optional(),
    teacherId: z
      .string()
      .uuid({ message: "Giáo viên không hợp lệ" })
      .optional(),
    maxStudents: z
      .number()
      .int({ message: "Sĩ số phải là số nguyên" })
      .min(1, { message: "Sĩ số tối thiểu là 1" })
      .max(500, { message: "Sĩ số tối đa là 500" }),
    room: z
      .string()
      .trim()
      .max(120, { message: "Phòng học tối đa 120 ký tự" })
      .transform(emptyStringToUndefined),
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
    learningMode: z.enum(["OFFLINE", "ONLINE", "HYBRID"], {
      message: "Vui lòng chọn hình thức học",
    }),
    admissionMode: z.enum(["INVITE_ONLY", "REQUEST_APPROVAL", "OPEN"], {
      message: "Vui lòng chọn cách ghi danh",
    }),
    allowWaitlist: z.boolean(),
    sendReminder: z.boolean(),
    autoCreateSessions: z.boolean(),
    note: z
      .string()
      .trim()
      .max(1000, { message: "Ghi chú tối đa 1000 ký tự" })
      .transform(emptyStringToUndefined),
  })
  .refine(
    (value) =>
      !value.startDate ||
      !value.endDate ||
      new Date(value.startDate) <= new Date(value.endDate),
    {
      message: "Ngày kết thúc phải sau ngày bắt đầu",
      path: ["endDate"],
    }
  )
  .refine(
    (value) =>
      !value.startTime || !value.endTime || value.startTime < value.endTime,
    {
      message: "Giờ kết thúc phải sau giờ bắt đầu",
      path: ["endTime"],
    }
  )

export type CreateClassInput = z.input<typeof createClassSchema>
export type CreateClassReqDto = z.output<typeof createClassSchema>
