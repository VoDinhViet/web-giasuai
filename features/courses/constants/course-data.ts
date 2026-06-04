import {
  BookOpenCheck,
  CalendarDays,
  Clock3,
  Users,
  type LucideIcon,
} from "lucide-react"

export type CourseStatus = "published" | "draft" | "archived"
export type CourseLessonStatus = "published" | "draft" | "locked"

export type CourseLesson = {
  lessonCode: string
  title: string
  duration: string
  type: "Video" | "Bài đọc" | "Bài tập" | "Workshop" | "Quiz" | "Tài liệu"
  status: CourseLessonStatus
  resourceCount: number
  updatedAt: string
}

export type CourseAssignmentStatus = "open" | "grading" | "graded" | "draft"

export type CourseAssignment = {
  assignmentCode: string
  title: string
  lessonCode: string
  type: "Bài tập" | "Quiz" | "Dự án"
  dueDate: string
  submissionCount: number
  gradedCount: number
  averageScore: number
  status: CourseAssignmentStatus
}

export type Course = {
  courseCode: string
  courseName: string
  category: string
  author: string
  learnerCount: number
  lessonCount: number
  duration: string
  startDate: string
  status: CourseStatus
  description: string
  objectives: string[]
  audience: string
  level: string
  completionRate: number
  lessons: CourseLesson[]
  assignments: CourseAssignment[]
}

export type CourseStat = {
  label: string
  value: string
  helper: string
  icon: LucideIcon
}

export const courseStats: CourseStat[] = [
  {
    label: "Tổng khóa học",
    value: "24",
    helper: "18 khóa đang mở",
    icon: BookOpenCheck,
  },
  {
    label: "Học viên đăng ký",
    value: "1.248",
    helper: "+86 trong tháng này",
    icon: Users,
  },
  {
    label: "Giờ đào tạo",
    value: "320h",
    helper: "Theo lịch hiện tại",
    icon: Clock3,
  },
  {
    label: "Lịch khai giảng",
    value: "7",
    helper: "Trong 30 ngày tới",
    icon: CalendarDays,
  },
]

export const courses: Course[] = [
  {
    courseCode: "CRS-001",
    courseName: "Kỹ năng bán hàng B2B",
    category: "Kinh doanh",
    author: "Nguyễn Minh Anh",
    learnerCount: 128,
    lessonCount: 18,
    duration: "24 giờ",
    startDate: "10/06/2026",
    status: "published",
    description:
      "Khóa học giúp đội ngũ kinh doanh xây dựng quy trình bán hàng B2B từ tìm kiếm khách hàng, khai thác nhu cầu đến chốt hợp đồng và chăm sóc sau bán.",
    objectives: [
      "Xây dựng kịch bản tiếp cận khách hàng B2B rõ ràng.",
      "Phân tích nhu cầu và xác định người ra quyết định.",
      "Theo dõi pipeline bán hàng bằng chỉ số đo được.",
    ],
    audience: "Nhân viên kinh doanh, tư vấn tuyển sinh, quản lý nhóm bán hàng",
    level: "Trung cấp",
    completionRate: 76,
    lessons: [
      { lessonCode: "L-001", title: "Tổng quan bán hàng B2B", duration: "45 phút", type: "Video", status: "published", resourceCount: 2, updatedAt: "01/06/2026" },
      { lessonCode: "L-002", title: "Xây dựng chân dung khách hàng", duration: "35 phút", type: "Bài đọc", status: "published", resourceCount: 3, updatedAt: "01/06/2026" },
      { lessonCode: "L-003", title: "Kịch bản discovery call", duration: "60 phút", type: "Workshop", status: "draft", resourceCount: 1, updatedAt: "02/06/2026" },
      { lessonCode: "L-004", title: "Bài tập pipeline mẫu", duration: "30 phút", type: "Bài tập", status: "locked", resourceCount: 1, updatedAt: "02/06/2026" },
    ],
    assignments: [
      { assignmentCode: "ASM-001", title: "Bài tập pipeline mẫu", lessonCode: "L-004", type: "Bài tập", dueDate: "20/06/2026", submissionCount: 86, gradedCount: 61, averageScore: 8.2, status: "grading" },
      { assignmentCode: "ASM-002", title: "Quiz chân dung khách hàng", lessonCode: "L-002", type: "Quiz", dueDate: "16/06/2026", submissionCount: 104, gradedCount: 104, averageScore: 8.6, status: "graded" },
      { assignmentCode: "ASM-003", title: "Dự án kịch bản tư vấn", lessonCode: "L-003", type: "Dự án", dueDate: "28/06/2026", submissionCount: 12, gradedCount: 0, averageScore: 0, status: "open" },
    ],
  },
  {
    courseCode: "CRS-002",
    courseName: "Quản lý sản xuất tinh gọn",
    category: "Vận hành",
    author: "Trần Quốc Huy",
    learnerCount: 84,
    lessonCount: 12,
    duration: "16 giờ",
    startDate: "18/06/2026",
    status: "published",
    description:
      "Nội dung tập trung vào cách nhận diện lãng phí, chuẩn hóa quy trình và điều phối nguồn lực để tối ưu vận hành lớp học hoặc trung tâm đào tạo.",
    objectives: [
      "Nhận diện điểm nghẽn trong vận hành hằng ngày.",
      "Thiết kế quy trình chuẩn và chỉ số kiểm soát.",
      "Tổ chức họp cải tiến ngắn, có hành động rõ ràng.",
    ],
    audience: "Quản lý vận hành, trưởng nhóm, điều phối viên học vụ",
    level: "Trung cấp",
    completionRate: 68,
    lessons: [
      { lessonCode: "L-011", title: "Nguyên lý tinh gọn", duration: "50 phút", type: "Video", status: "published", resourceCount: 2, updatedAt: "28/05/2026" },
      { lessonCode: "L-012", title: "Bản đồ quy trình", duration: "40 phút", type: "Bài đọc", status: "published", resourceCount: 2, updatedAt: "28/05/2026" },
      { lessonCode: "L-013", title: "Thực hành loại bỏ lãng phí", duration: "70 phút", type: "Workshop", status: "draft", resourceCount: 1, updatedAt: "30/05/2026" },
    ],
    assignments: [
      { assignmentCode: "ASM-011", title: "Bản đồ quy trình hiện tại", lessonCode: "L-012", type: "Bài tập", dueDate: "24/06/2026", submissionCount: 40, gradedCount: 21, averageScore: 7.9, status: "grading" },
    ],
  },
  {
    courseCode: "CRS-003",
    courseName: "Onboarding người dùng mới",
    category: "Người dùng",
    author: "Phạm Hà Linh",
    learnerCount: 56,
    lessonCount: 9,
    duration: "8 giờ",
    startDate: "22/06/2026",
    status: "draft",
    description:
      "Khóa học hướng dẫn người dùng mới làm quen hệ thống, thao tác với lớp học, khóa học, lịch dạy và công cụ AI trong môi trường quản trị.",
    objectives: [
      "Hiểu cấu trúc màn hình và luồng thao tác chính.",
      "Tạo và theo dõi dữ liệu học tập cơ bản.",
      "Sử dụng AI Assistant trong công việc hằng ngày.",
    ],
    audience: "Người dùng mới, trợ giảng, quản trị viên học vụ",
    level: "Cơ bản",
    completionRate: 42,
    lessons: [
      { lessonCode: "L-021", title: "Làm quen giao diện", duration: "25 phút", type: "Video", status: "published", resourceCount: 1, updatedAt: "02/06/2026" },
      { lessonCode: "L-022", title: "Quản lý hồ sơ người dùng", duration: "30 phút", type: "Bài đọc", status: "draft", resourceCount: 2, updatedAt: "02/06/2026" },
      { lessonCode: "L-023", title: "Thực hành tạo khóa học", duration: "45 phút", type: "Bài tập", status: "draft", resourceCount: 1, updatedAt: "02/06/2026" },
    ],
    assignments: [
      { assignmentCode: "ASM-021", title: "Thiết lập hồ sơ đầu tiên", lessonCode: "L-022", type: "Bài tập", dueDate: "25/06/2026", submissionCount: 18, gradedCount: 0, averageScore: 0, status: "draft" },
    ],
  },
  {
    courseCode: "CRS-004",
    courseName: "An toàn lao động nhà xưởng",
    category: "Tuân thủ",
    author: "Lê Hoàng Nam",
    learnerCount: 240,
    lessonCount: 15,
    duration: "12 giờ",
    startDate: "05/07/2026",
    status: "published",
    description:
      "Bộ học liệu về quy định an toàn, nhận diện rủi ro và xử lý tình huống khẩn cấp trong môi trường thực hành có thiết bị.",
    objectives: [
      "Nắm quy trình an toàn trước ca làm việc.",
      "Nhận diện rủi ro thường gặp theo khu vực.",
      "Xử lý sự cố theo checklist được phê duyệt.",
    ],
    audience: "Học viên thực hành, giảng viên hướng dẫn, quản lý cơ sở",
    level: "Cơ bản",
    completionRate: 91,
    lessons: [
      { lessonCode: "L-031", title: "Quy tắc an toàn chung", duration: "35 phút", type: "Video", status: "published", resourceCount: 2, updatedAt: "20/05/2026" },
      { lessonCode: "L-032", title: "Checklist trước buổi thực hành", duration: "20 phút", type: "Tài liệu", status: "published", resourceCount: 1, updatedAt: "20/05/2026" },
      { lessonCode: "L-033", title: "Diễn tập tình huống", duration: "90 phút", type: "Workshop", status: "published", resourceCount: 1, updatedAt: "21/05/2026" },
    ],
    assignments: [
      { assignmentCode: "ASM-031", title: "Quiz quy tắc an toàn", lessonCode: "L-031", type: "Quiz", dueDate: "08/07/2026", submissionCount: 212, gradedCount: 212, averageScore: 8.9, status: "graded" },
    ],
  },
  {
    courseCode: "CRS-005",
    courseName: "Excel cho quản trị dữ liệu",
    category: "Kỹ năng",
    author: "Đỗ Thanh Mai",
    learnerCount: 31,
    lessonCount: 10,
    duration: "10 giờ",
    startDate: "12/05/2026",
    status: "archived",
    description:
      "Khóa học giúp học viên xử lý bảng tính, chuẩn hóa dữ liệu và tạo báo cáo nhanh bằng các hàm Excel thường dùng trong quản trị đào tạo.",
    objectives: [
      "Làm sạch dữ liệu và tránh lỗi nhập liệu phổ biến.",
      "Dùng hàm tra cứu, thống kê và điều kiện.",
      "Tạo báo cáo tiến độ học tập từ bảng dữ liệu.",
    ],
    audience: "Nhân viên hành chính, học vụ, điều phối viên",
    level: "Cơ bản",
    completionRate: 100,
    lessons: [
      { lessonCode: "L-041", title: "Chuẩn hóa dữ liệu", duration: "30 phút", type: "Video", status: "published", resourceCount: 2, updatedAt: "10/05/2026" },
      { lessonCode: "L-042", title: "Hàm tra cứu", duration: "45 phút", type: "Bài tập", status: "published", resourceCount: 1, updatedAt: "11/05/2026" },
      { lessonCode: "L-043", title: "Báo cáo nhanh", duration: "55 phút", type: "Workshop", status: "published", resourceCount: 3, updatedAt: "12/05/2026" },
    ],
    assignments: [
      { assignmentCode: "ASM-041", title: "Báo cáo Excel cuối khóa", lessonCode: "L-043", type: "Dự án", dueDate: "12/05/2026", submissionCount: 31, gradedCount: 31, averageScore: 9.0, status: "graded" },
    ],
  },
]

export function getCourseByCode(courseCode: string) {
  return courses.find((course) => course.courseCode === courseCode)
}
