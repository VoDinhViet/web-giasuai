export type ClassStatus = "ACTIVE" | "UPCOMING" | "COMPLETED" | "PAUSED"
export type ClassFormat = "OFFLINE" | "ONLINE" | "HYBRID"
export type ClassJoinPolicy = "INVITE_ONLY" | "REQUEST_APPROVAL" | "OPEN"
export type ClassEnrollmentStatus =
  | "PENDING"
  | "ACTIVE"
  | "COMPLETED"
  | "DROPPED"
  | "REJECTED"
export type ClassEnrollmentSource = "CODE" | "INVITE"
export type ClassSessionStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED"
export type ClassWeekday =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"

export type ClassFormOption = {
  value: string
  label: string
  description?: string
}

export type ClassFormOptions = {
  courseOptions: ClassFormOption[]
  teacherOptions: ClassFormOption[]
}

export type ClassInstructor = {
  id: string
  email: string
  username: string
  fullName: string
  role: string
  isLocked: boolean
  createdAt?: string
}

export type Class = {
  id: string
  code: string
  name: string
  instructor: ClassInstructor
  studentCount?: number
  maxStudents: number
  schedule: string | null
  startDate: string | null
  endDate: string | null
  status: ClassStatus
}

export type ClassDetail = {
  id: string
  code: string
  name: string
  instructor: ClassInstructor
  studentCount?: number
  maxStudents: number
  schedule: string | null
  meetingUrl: string | null
  startDate: string | null
  endDate: string | null
  startTime: string | null
  endTime: string | null
  repeatDays: ClassWeekday[]
  status: ClassStatus
  format: ClassFormat
  joinPolicy: ClassJoinPolicy
  waitlistEnabled: boolean
  reminderEnabled: boolean
  autoCreateSessions: boolean
  note: string | null
  students?: ClassLearner[]
  courses?: ClassCourse[]
  sessions?: ClassSession[]
}

export type ClassLearner = {
  id: string
  email: string
  username: string
  fullName: string
  role: string
  isLocked: boolean
  createdAt: string
}

export type ClassCourse = {
  courseId: string
  courseCode: string
  courseName: string
  lessonCount: number
  completedLessons: number
  required: boolean
}

export type ClassSession = {
  id: string
  code: string
  title: string
  courseId: string | null
  courseName: string | null
  instructorId: string | null
  instructorName: string | null
  sessionDate: string
  startTime: string
  endTime: string
  timeRange: string
  room: string | null
  status: ClassSessionStatus
}

export type ClassEnrollment = {
  id: string
  learnerId: string
  studentCode: string
  studentName: string
  email: string
  note: string | null
  requestedAt: string
  reviewedAt: string | null
  source: ClassEnrollmentSource
  status: ClassEnrollmentStatus
}
