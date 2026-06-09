import type { Course } from "@/features/courses/types"

export interface ClassCourse extends Course {
  completedLessons: number
  required: boolean
  lessonCount: number
}

export interface UnassignedClassCourse extends Course {
  lessonCount: number
}


