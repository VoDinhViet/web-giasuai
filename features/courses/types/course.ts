import type { User } from "@/features/users/types"
import type { Lesson } from "@/features/lessons/types"

export type CourseStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED"
export type CourseLevel =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED"
  | "ALL_LEVELS"

export interface Course {
  id: string
  code: string
  name: string
  category: string
  auth: User | null
  description: string | null
  audience: string | null
  level: CourseLevel
  durationMinutes: number
  startDate: string | null
  status: CourseStatus
  createdAt: string
  updatedAt: string
  lessons?: Lesson[]
}

export interface CourseListItem {
  id: string
  code: string
  name: string
  category: string
  authorName: string | null
  learnerCount: number
  lessonCount: number
  durationMinutes: number
  startDate: string | null
  status: CourseStatus
}
