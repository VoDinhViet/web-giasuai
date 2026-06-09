import type { User } from "@/features/users/types"
import type { CourseObjective, CourseSection } from "@/features/courses/types"

export interface CourseCurriculum {
  id: string
  code: string
  name: string
  category: string
  author: User
  description: string | null
  audience: string | null
  level: string
  durationMinutes: number
  startDate: string | null
  status: string
  objectives: CourseObjective[]
  sections: CourseSection[]
}
