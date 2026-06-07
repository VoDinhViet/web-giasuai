export type CourseStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED"
export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "ALL_LEVELS"
export type CourseLessonType =
  | "VIDEO"
  | "READING"
  | "EXERCISE"
  | "WORKSHOP"
  | "QUIZ"
  | "RESOURCE"
export type CourseLessonStatus = "PUBLISHED" | "DRAFT" | "LOCKED"

export interface Course {
  id: string
  code: string
  name: string
  category: string
  lessonCount: number
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

export interface CourseDetail {
  id: string
  code: string
  name: string
  category: string
  authorId: string | null
  authorName: string | null
  description: string | null
  audience: string | null
  level: CourseLevel
  durationMinutes: number
  startDate: string | null
  status: CourseStatus
}

export interface CourseChapter {
  id: string
  chapterCode: string
  chapterTitle: string
  order: number
  lessonCount: number
}

export interface CourseLessonStructureItem {
  id: string
  chapterCode: string
  lessonCode: string
  lessonTitle: string
  lessonType: CourseLessonType
  durationMinutes: number
  status: CourseLessonStatus
  resourceCount: number
  position: number
  updatedAt: string | null
}

export interface CourseStructure {
  course: CourseDetail
  chapters: CourseChapter[]
  lessons: CourseLessonStructureItem[]
}

export interface LessonTheoryPartFile {
  id: string
  fileName: string
  contentType: string
  fileSize: number
  url: string | null
  uploadedAt: string | null
}

export interface LessonTheoryPart {
  id: string
  title: string
  content: string | null
  order: number
  files: LessonTheoryPartFile[]
}

export interface LessonSimulation {
  id: string | null
  title: string | null
  fileName: string | null
  contentType: string | null
  fileSize: number | null
  previewUrl: string | null
  launchUrl: string | null
  status: "READY" | "PROCESSING" | "FAILED" | null
}

export interface LessonExerciseQuestion {
  id: string
  questionText: string
  options: string[]
  correctOptionIndex: number
  explanation: string | null
  point: number
  order: number
}

export interface LessonExercise {
  id: string | null
  title: string
  maxScore: number
  passingScore: number
  questions: LessonExerciseQuestion[]
}

export interface CourseLessonContent {
  summary: string | null
  theoryParts: LessonTheoryPart[]
  simulation: LessonSimulation | null
  exercise: LessonExercise | null
}

export interface CourseLessonDetail extends CourseLessonStructureItem {
  content: CourseLessonContent
}

export interface CourseImportRow {
  rowNumber: number
  courseCode: string
  courseName: string
  category: string
  status: "Hợp lệ" | "Cảnh báo"
  note: string
}

export interface ChapterImportRow {
  rowNumber: number
  courseCode: string
  chapterCode: string
  chapterTitle: string
  order: number
  status: "Hợp lệ" | "Lỗi"
  note: string
}

export interface LessonImportRow {
  rowNumber: number
  chapterCode: string
  lessonCode: string
  lessonTitle: string
  lessonType: string
  duration: string
  status: "Hợp lệ" | "Lỗi"
  note: string
}

export interface CourseImportPreview {
  courses: CourseImportRow[]
  chapters: ChapterImportRow[]
  lessons: LessonImportRow[]
}
