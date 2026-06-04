import { classes, type ClassStudentStatus } from "@/features/classes/constants/class-data"

export type StudentWeakness = {
  name: string
  level: "high" | "medium" | "low"
  suggestion: string
}

export type StudentCourseProgress = {
  courseCode: string
  courseName: string
  classCode: string
  className: string
  progress: number
  completedLessons: number
  lessonCount: number
}

export type StudentDetail = {
  studentId: string
  fullName: string
  email: string
  phone: string
  status: ClassStudentStatus
  attendanceRate: number
  progress: number
  averageScore: number
  lastActive: string
  learningHours: number
  aiPracticeCount: number
  teacherNote: string
  courses: StudentCourseProgress[]
  weaknesses: StudentWeakness[]
  recentActivities: { title: string; time: string }[]
}

export const students: StudentDetail[] = classes.flatMap((classItem) =>
  classItem.students.map((student) => ({
    studentId: student.studentCode,
    fullName: student.fullName,
    email: student.email,
    phone: "0901 234 567",
    status: student.status,
    attendanceRate: student.attendanceRate,
    progress: student.progress,
    averageScore: student.averageScore,
    lastActive: student.lastActive,
    learningHours: Math.max(8, Math.round(student.progress * 0.7)),
    aiPracticeCount: Math.max(3, Math.round(student.progress / 8)),
    teacherNote:
      student.status === "risk"
        ? "Cần nhắc lịch học đều, giao bài nhỏ theo ngày và theo dõi phản hồi sau mỗi buổi."
        : student.status === "warning"
          ? "Tiến độ có dấu hiệu chậm lại. Nên tăng bài luyện ngắn và kiểm tra lại phần nền tảng."
          : "Duy trì nhịp học tốt. Có thể giao thêm bài nâng cao để tăng tốc độ xử lý.",
    courses: classItem.courses.map((course) => ({
      courseCode: course.courseCode,
      courseName: course.courseName,
      classCode: classItem.classCode,
      className: classItem.className,
      progress: Math.min(student.progress, 100),
      completedLessons: Math.min(
        course.lessonCount,
        Math.round((student.progress / 100) * course.lessonCount)
      ),
      lessonCount: course.lessonCount,
    })),
    weaknesses:
      student.status === "risk"
        ? [
            {
              name: "Mất gốc kiến thức nền",
              level: "high",
              suggestion: "Ôn lại bài nền tảng trước khi học nội dung mới.",
            },
            {
              name: "Tần suất học thấp",
              level: "high",
              suggestion: "Chia bài luyện thành block 15 phút mỗi ngày.",
            },
          ]
        : student.status === "warning"
          ? [
              {
                name: "Tiến độ bài tập chậm",
                level: "medium",
                suggestion: "Giao bài luyện trọng tâm sau mỗi buổi học.",
              },
              {
                name: "Cần luyện phản xạ đề",
                level: "medium",
                suggestion: "Thêm mini-test 10 phút vào cuối tuần.",
              },
            ]
          : [
              {
                name: "Bài nâng cao",
                level: "low",
                suggestion: "Tăng độ khó để mở rộng tư duy giải bài.",
              },
            ],
    recentActivities: [
      { title: "Hoàn thành bài luyện tập được giao", time: "Hôm nay" },
      { title: "Gia sư cập nhật nhận xét tiến độ", time: "Hôm qua" },
      { title: "AI Tutor gợi ý lộ trình ôn tập", time: "3 ngày trước" },
    ],
  }))
)

export function getStudentById(studentId: string) {
  return students.find((student) => student.studentId === studentId)
}
