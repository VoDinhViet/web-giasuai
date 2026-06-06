import {
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  Users,
  type LucideIcon,
} from "lucide-react"

export type ClassStatus = "active" | "upcoming" | "completed" | "paused"

export type ClassSession = {
  sessionCode: string
  title: string
  date: string
  time: string
  room: string
  courseName: string
  instructorName: string
  attendanceCount: number
  status: "scheduled" | "completed" | "cancelled"
}

export type ClassStudentStatus = "good" | "warning" | "risk"

export type ClassStudent = {
  studentCode: string
  fullName: string
  email: string
  attendanceRate: number
  progress: number
  averageScore: number
  lastActive: string
  status: ClassStudentStatus
}

export type ClassCourse = {
  courseCode: string
  courseName: string
  lessonCount: number
  completedLessons: number
  required: boolean
}

export type ClassItem = {
  classCode: string
  className: string
  courseName: string
  instructorName: string
  studentCount: number
  maxStudents: number
  schedule: string
  room: string
  startDate: string
  endDate: string
  status: ClassStatus
  progress: number
  nextSessions: ClassSession[]
  courses: ClassCourse[]
  students: ClassStudent[]
}

export type ClassStat = {
  label: string
  value: string
  helper: string
  icon: LucideIcon
}

export const classStats: ClassStat[] = [
  {
    label: "Tổng lớp học",
    value: "32",
    helper: "18 lớp đang học",
    icon: GraduationCap,
  },
  {
    label: "Học viên",
    value: "846",
    helper: "Đang theo học",
    icon: Users,
  },
  {
    label: "Buổi tuần này",
    value: "54",
    helper: "Theo lịch giảng dạy",
    icon: CalendarDays,
  },
  {
    label: "Điểm danh",
    value: "92%",
    helper: "Tỷ lệ trung bình",
    icon: ClipboardCheck,
  },
]

export const classes: ClassItem[] = [
  {
    classCode: "CLS-001",
    className: "B2B Sales A01",
    courseName: "Kỹ năng bán hàng B2B",
    instructorName: "Nguyễn Minh Anh",
    studentCount: 32,
    maxStudents: 36,
    schedule: "Thứ 2, 4 - 19:00",
    room: "Phòng 301",
    startDate: "10/06/2026",
    endDate: "10/08/2026",
    status: "active",
    progress: 42,
    nextSessions: [
      {
        sessionCode: "SES-001",
        title: "Discovery call",
        date: "12/06/2026",
        time: "19:00",
        room: "Phòng 301",
        courseName: "Kỹ năng bán hàng B2B",
        instructorName: "Nguyễn Minh Anh",
        attendanceCount: 30,
        status: "scheduled",
      },
      {
        sessionCode: "SES-002",
        title: "Kịch bản tư vấn",
        date: "14/06/2026",
        time: "19:00",
        room: "Phòng 301",
        courseName: "Kỹ năng bán hàng B2B",
        instructorName: "Nguyễn Minh Anh",
        attendanceCount: 29,
        status: "scheduled",
      },
      {
        sessionCode: "SES-003",
        title: "Tổng quan bán hàng B2B",
        date: "10/06/2026",
        time: "19:00",
        room: "Phòng 301",
        courseName: "Kỹ năng bán hàng B2B",
        instructorName: "Nguyễn Minh Anh",
        attendanceCount: 31,
        status: "completed",
      },
    ],
    courses: [
      {
        courseCode: "CRS-001",
        courseName: "Kỹ năng bán hàng B2B",
        lessonCount: 18,
        completedLessons: 8,
        required: true,
      },
      {
        courseCode: "CRS-005",
        courseName: "Excel cho quản trị dữ liệu",
        lessonCount: 10,
        completedLessons: 4,
        required: false,
      },
    ],
    students: [
      {
        studentCode: "HV-001",
        fullName: "Lê Minh Khang",
        email: "khang@example.com",
        attendanceRate: 96,
        progress: 72,
        averageScore: 8.7,
        lastActive: "03/06/2026",
        status: "good",
      },
      {
        studentCode: "HV-002",
        fullName: "Nguyễn Thu Hà",
        email: "ha@example.com",
        attendanceRate: 88,
        progress: 64,
        averageScore: 8.1,
        lastActive: "02/06/2026",
        status: "good",
      },
      {
        studentCode: "HV-003",
        fullName: "Trần Hoàng Phúc",
        email: "phuc@example.com",
        attendanceRate: 72,
        progress: 41,
        averageScore: 6.4,
        lastActive: "29/05/2026",
        status: "warning",
      },
      {
        studentCode: "HV-004",
        fullName: "Phạm Ngọc Linh",
        email: "linh@example.com",
        attendanceRate: 55,
        progress: 28,
        averageScore: 5.8,
        lastActive: "24/05/2026",
        status: "risk",
      },
    ],
  },
  {
    classCode: "CLS-002",
    className: "Lean Ops K02",
    courseName: "Quản lý sản xuất tinh gọn",
    instructorName: "Trần Quốc Huy",
    studentCount: 24,
    maxStudents: 30,
    schedule: "Thứ 3, 5 - 18:30",
    room: "Online",
    startDate: "18/06/2026",
    endDate: "30/07/2026",
    status: "upcoming",
    progress: 0,
    nextSessions: [
      {
        sessionCode: "SES-021",
        title: "Khai giảng",
        date: "18/06/2026",
        time: "18:30",
        room: "Online",
        courseName: "Quản lý sản xuất tinh gọn",
        instructorName: "Trần Quốc Huy",
        attendanceCount: 0,
        status: "scheduled",
      },
    ],
    courses: [
      {
        courseCode: "CRS-002",
        courseName: "Quản lý sản xuất tinh gọn",
        lessonCount: 12,
        completedLessons: 0,
        required: true,
      },
    ],
    students: [
      {
        studentCode: "HV-021",
        fullName: "Đặng Quốc Bảo",
        email: "bao@example.com",
        attendanceRate: 0,
        progress: 0,
        averageScore: 0,
        lastActive: "Chưa bắt đầu",
        status: "good",
      },
    ],
  },
  {
    classCode: "CLS-003",
    className: "Onboarding U01",
    courseName: "Onboarding người dùng mới",
    instructorName: "Phạm Hà Linh",
    studentCount: 18,
    maxStudents: 25,
    schedule: "Thứ 6 - 09:00",
    room: "Phòng Lab",
    startDate: "22/06/2026",
    endDate: "12/07/2026",
    status: "paused",
    progress: 18,
    nextSessions: [
      {
        sessionCode: "SES-031",
        title: "Thực hành tạo khóa học",
        date: "26/06/2026",
        time: "09:00",
        room: "Phòng Lab",
        courseName: "Onboarding người dùng mới",
        instructorName: "Phạm Hà Linh",
        attendanceCount: 12,
        status: "scheduled",
      },
    ],
    courses: [
      {
        courseCode: "CRS-003",
        courseName: "Onboarding người dùng mới",
        lessonCount: 9,
        completedLessons: 2,
        required: true,
      },
    ],
    students: [
      {
        studentCode: "HV-031",
        fullName: "Võ Thanh Tùng",
        email: "tung@example.com",
        attendanceRate: 67,
        progress: 18,
        averageScore: 6.2,
        lastActive: "30/05/2026",
        status: "warning",
      },
    ],
  },
  {
    classCode: "CLS-004",
    className: "Safety Workshop S04",
    courseName: "An toàn lao động nhà xưởng",
    instructorName: "Lê Hoàng Nam",
    studentCount: 48,
    maxStudents: 50,
    schedule: "Thứ 7 - 08:00",
    room: "Xưởng thực hành",
    startDate: "01/05/2026",
    endDate: "25/05/2026",
    status: "completed",
    progress: 100,
    nextSessions: [],
    courses: [
      {
        courseCode: "CRS-004",
        courseName: "An toàn lao động nhà xưởng",
        lessonCount: 15,
        completedLessons: 15,
        required: true,
      },
    ],
    students: [
      {
        studentCode: "HV-041",
        fullName: "Bùi Khánh Vy",
        email: "vy@example.com",
        attendanceRate: 100,
        progress: 100,
        averageScore: 9.1,
        lastActive: "25/05/2026",
        status: "good",
      },
    ],
  },
]

export function getClassByCode(classCode: string) {
  return classes.find((classItem) => classItem.classCode === classCode)
}

export function getClassSessionByCode(classCode: string, sessionCode: string) {
  const classItem = getClassByCode(classCode)

  if (!classItem) {
    return undefined
  }

  const session = classItem.nextSessions.find(
    (classSession) => classSession.sessionCode === sessionCode
  )

  if (!session) {
    return undefined
  }

  return { classItem, session }
}
