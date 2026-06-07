import type {
  ClassFormat,
  ClassJoinPolicy,
  ClassStatus,
  ClassWeekday,
} from "../types"

export const classStatusOptions = [
  { value: "ACTIVE", label: "Đang học" },
  { value: "UPCOMING", label: "Sắp mở" },
  { value: "COMPLETED", label: "Hoàn thành" },
  { value: "PAUSED", label: "Tạm dừng" },
] satisfies Array<{ value: ClassStatus; label: string }>

export const classFormatOptions = [
  { value: "OFFLINE", label: "Tại lớp" },
  { value: "ONLINE", label: "Online" },
  { value: "HYBRID", label: "Kết hợp" },
] satisfies Array<{ value: ClassFormat; label: string }>

export const classJoinPolicyOptions = [
  { value: "INVITE_ONLY", label: "Chỉ mời vào lớp" },
  { value: "REQUEST_APPROVAL", label: "Duyệt yêu cầu" },
  { value: "OPEN", label: "Mở tự đăng ký" },
] satisfies Array<{ value: ClassJoinPolicy; label: string }>

export const classWeekdayOptions = [
  { value: "MONDAY", label: "T2" },
  { value: "TUESDAY", label: "T3" },
  { value: "WEDNESDAY", label: "T4" },
  { value: "THURSDAY", label: "T5" },
  { value: "FRIDAY", label: "T6" },
  { value: "SATURDAY", label: "T7" },
  { value: "SUNDAY", label: "CN" },
] satisfies Array<{ value: ClassWeekday; label: string }>
