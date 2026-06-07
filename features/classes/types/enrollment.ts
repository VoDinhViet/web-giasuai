import type { Nullable } from "@/types/common"

export type ClassEnrollmentStatus =
  | "PENDING"
  | "ACTIVE"
  | "COMPLETED"
  | "DROPPED"
  | "REJECTED"
export type ClassEnrollmentSource = "CODE" | "INVITE"

export type ClassEnrollment = {
  id: string
  learnerId: string
  studentCode: string
  studentName: string
  email: string
  note: Nullable<string>
  requestedAt: string
  reviewedAt: Nullable<string>
  source: ClassEnrollmentSource
  status: ClassEnrollmentStatus
}
