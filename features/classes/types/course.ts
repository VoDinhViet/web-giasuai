import type { Course } from "@/features/courses/types"

export interface ClassCourse extends Course {
  completedLessons: number
  required: boolean
}

export type UnassignedClassCourse = Course


