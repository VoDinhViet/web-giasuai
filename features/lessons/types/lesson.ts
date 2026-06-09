export type LessonType =
  | "VIDEO"
  | "READING"
  | "EXERCISE"
  | "WORKSHOP"
  | "QUIZ"
  | "RESOURCE"
export type LessonStatus = "PUBLISHED" | "DRAFT" | "LOCKED"
export type LessonPartType =
  | "TEXT"
  | "VIDEO"
  | "EXERCISE"
  | "QUIZ"
  | "RESOURCE"

export interface LessonPart {
  id: string
  lessonId: string
  title: string
  type: LessonPartType
  content: string
  durationMinutes: number
  position: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface Lesson {
  id: string
  courseId: string
  sectionId: string | null
  code: string
  title: string
  durationMinutes: number
  type: LessonType
  status: LessonStatus
  resourceCount: number
  position: number
  createdAt: string
  updatedAt: string
  parts?: LessonPart[]
}
