import type { User } from "@/features/users/types"
import type { Nullable } from "@/types/common"
import type { ClassCourse } from "./course"
import type { ClassSession } from "./session"

export type ClassStatus = "ACTIVE" | "UPCOMING" | "COMPLETED" | "PAUSED"
export type ClassFormat = "OFFLINE" | "ONLINE" | "HYBRID"
export type ClassJoinPolicy = "INVITE_ONLY" | "REQUEST_APPROVAL" | "OPEN"
export type ClassWeekday =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"

export interface Class {
  id: string
  code: string
  name: string
  instructorId: string
  instructor: User
  studentCount: number
  maxStudents: number
  schedule?: Nullable<string>
  meetingUrl: Nullable<string>
  startDate: Nullable<string>
  endDate: Nullable<string>
  startTime: Nullable<string>
  endTime: Nullable<string>
  repeatDays: ClassWeekday[]
  status: ClassStatus
  format: ClassFormat
  joinPolicy: ClassJoinPolicy
  waitlistEnabled: boolean
  reminderEnabled: boolean
  autoCreateSessions: boolean
  note: Nullable<string>
  createdAt: string
  updatedAt: string
  students?: User[]
  courses?: ClassCourse[]
  sessions?: ClassSession[]
}
