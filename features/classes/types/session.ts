import type { Nullable } from "@/types/common"

export type ClassSessionStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED"

export type ClassSession = {
  id: string
  code: string
  title: string
  courseId: Nullable<string>
  courseName: Nullable<string>
  instructorId: Nullable<string>
  instructorName: Nullable<string>
  sessionDate: string
  startTime: string
  endTime: string
  timeRange: string
  room: Nullable<string>
  status: ClassSessionStatus
}
