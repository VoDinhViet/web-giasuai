import { Award, BookOpenCheck, Clock3, Flame } from "lucide-react"

import type { ProfileFocusItem } from "@/features/users/components/detail/profile-focus-panel"
import type { ProfileStatItem } from "@/features/users/components/detail/profile-stat-card"
import type { ProfileTimelineRow } from "@/features/users/components/detail/profile-timeline-panel"

export const profileLearningStats = [
  { label: "Giờ học tháng này", value: "42h", icon: Clock3, tone: "primary" },
  { label: "Bài đã hoàn thành", value: "18", icon: BookOpenCheck, tone: "sky" },
  {
    label: "Chuỗi học liên tục",
    value: "12 ngày",
    icon: Flame,
    tone: "orange",
  },
  { label: "Điểm tiến bộ", value: "+16%", icon: Award, tone: "green" },
] satisfies ProfileStatItem[]

export const profileStrengths = [
  { title: "Tư duy logic", helper: "Giải bài theo bước rõ ràng", value: 86 },
  { title: "Làm bài đều", helper: "Giữ nhịp luyện tập ổn định", value: 78 },
  {
    title: "Phản hồi nhanh",
    helper: "Trao đổi tốt sau mỗi buổi học",
    value: 92,
  },
] satisfies ProfileFocusItem[]

export const profileLearningGoals = [
  {
    title: "Ôn đại số tuyến tính",
    helper: "Ưu tiên phần ma trận và định thức",
    value: 68,
  },
  {
    title: "Cải thiện tốc độ giải đề",
    helper: "Mục tiêu giảm 15% thời gian làm bài",
    value: 54,
  },
  {
    title: "Hoàn thành 3 bài luyện tập/tuần",
    helper: "Theo dõi đều vào cuối tuần",
    value: 72,
  },
] satisfies ProfileFocusItem[]

export const profileRecentActivities = [
  { title: "Hoàn thành bài luyện tập Hàm số", time: "09:20 hôm nay" },
  { title: "Gia sư thêm nhận xét buổi học", time: "Tối qua" },
  { title: "Cập nhật mục tiêu học tuần", time: "2 ngày trước" },
] satisfies ProfileTimelineRow[]

export const profileUpcomingLessons = [
  { title: "Toán 12 - Đạo hàm", time: "19:30, Thứ 4" },
  { title: "Ôn đề theo năng lực", time: "20:00, Thứ 6" },
] satisfies ProfileTimelineRow[]
