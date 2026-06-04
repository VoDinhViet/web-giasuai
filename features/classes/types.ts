export type ClassStatus = "ACTIVE" | "UPCOMING" | "COMPLETED" | "PAUSED"
export type ClassLearningMode = "OFFLINE" | "ONLINE" | "HYBRID"
export type ClassAdmissionMode = "INVITE_ONLY" | "REQUEST_APPROVAL" | "OPEN"
export type ClassEnrollmentStatus =
  | "PENDING"
  | "ACTIVE"
  | "COMPLETED"
  | "DROPPED"
  | "REJECTED"
export type ClassEnrollmentSource = "CODE" | "INVITE"
export type ClassSessionStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED"
export type ClassAttendanceStatus = "PRESENT" | "LATE" | "ABSENT"
export type ClassStudentStatus = "GOOD" | "WARNING" | "RISK"
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

export type ClassListItem = {
  id: string
  code: string
  name: string
  courseId: string | null
  courseName: string | null
  teacherId: string | null
  teacherName: string | null
  studentCount: number
  maxStudents: number
  schedule: string | null
  room: string | null
  startDate: string | null
  endDate: string | null
  status: ClassStatus
  progressPercent: number
}

export type ClassDetail = {
  id: string
  code: string
  name: string
  courseId: string | null
  courseName: string | null
  teacherId: string | null
  teacherName: string | null
  studentCount: number
  maxStudents: number
  schedule: string | null
  room: string | null
  meetingUrl: string | null
  startDate: string | null
  endDate: string | null
  startTime: string | null
  endTime: string | null
  repeatDays: ClassWeekday[]
  status: ClassStatus
  learningMode: ClassLearningMode
  admissionMode: ClassAdmissionMode
  allowWaitlist: boolean
  sendReminder: boolean
  autoCreateSessions: boolean
  note: string | null
  progressPercent: number
  students: ClassStudent[]
  courses: ClassCourse[]
  sessions: ClassSession[]
}

export type ClassStudent = {
  studentId: string
  studentCode: string
  fullName: string
  email: string
  attendanceRate: number
  progressPercent: number
  averageScore: number
  lastActive: string | null
  status: ClassStudentStatus
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
  teacherId: string | null
  teacherName: string | null
  sessionDate: string
  startTime: string
  endTime: string
  timeRange: string
  room: string | null
  attendanceCount: number
  status: ClassSessionStatus
}

export type ClassEnrollment = {
  id: string
  studentId: string
  studentCode: string
  studentName: string
  email: string
  note: string | null
  requestedAt: string
  reviewedAt: string | null
  source: ClassEnrollmentSource
  status: ClassEnrollmentStatus
}

export type ClassAttendanceRecord = {
  id: string | null
  studentId: string
  studentCode: string
  fullName: string
  email: string
  attendanceRate: number
  status: ClassAttendanceStatus
  note: string | null
}

export type ClassAttendance = {
  session: ClassSession
  records: ClassAttendanceRecord[]
}
