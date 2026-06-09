import type { Lesson } from "@/features/lessons/types"

export interface CourseSection {
  id: string
  courseId: string
  code: string
  title: string
  position: number
  createdAt: string
  updatedAt: string
  lessons?: Lesson[]
}
