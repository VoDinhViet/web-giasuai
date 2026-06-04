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

export type CourseListItem = {
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

export type CourseDetail = {
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

export type CourseChapter = {
  id: string
  chapterCode: string
  chapterTitle: string
  order: number
  lessonCount: number
}

export type CourseLessonStructureItem = {
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

export type CourseStructure = {
  course: CourseDetail
  chapters: CourseChapter[]
  lessons: CourseLessonStructureItem[]
}

export type LessonTheoryPartFile = {
  id: string
  fileName: string
  contentType: string
  fileSize: number
  url: string | null
  uploadedAt: string | null
}

export type LessonTheoryPart = {
  id: string
  title: string
  content: string | null
  order: number
  files: LessonTheoryPartFile[]
}

export type LessonSimulation = {
  id: string | null
  title: string | null
  fileName: string | null
  contentType: string | null
  fileSize: number | null
  previewUrl: string | null
  launchUrl: string | null
  status: "READY" | "PROCESSING" | "FAILED" | null
}

export type LessonExerciseQuestion = {
  id: string
  questionText: string
  options: string[]
  correctOptionIndex: number
  explanation: string | null
  point: number
  order: number
}

export type LessonExercise = {
  id: string | null
  title: string
  maxScore: number
  passingScore: number
  questions: LessonExerciseQuestion[]
}

export type CourseLessonContent = {
  summary: string | null
  theoryParts: LessonTheoryPart[]
  simulation: LessonSimulation | null
  exercise: LessonExercise | null
}

export type CourseLessonDetail = CourseLessonStructureItem & {
  content: CourseLessonContent
}

export type CourseImportRow = {
  rowNumber: number
  courseCode: string
  courseName: string
  category: string
  status: "Hợp lệ" | "Cảnh báo"
  note: string
}

export type ChapterImportRow = {
  rowNumber: number
  courseCode: string
  chapterCode: string
  chapterTitle: string
  order: number
  status: "Hợp lệ" | "Lỗi"
  note: string
}

export type LessonImportRow = {
  rowNumber: number
  chapterCode: string
  lessonCode: string
  lessonTitle: string
  lessonType: string
  duration: string
  status: "Hợp lệ" | "Lỗi"
  note: string
}

export type CourseImportPreview = {
  courses: CourseImportRow[]
  chapters: ChapterImportRow[]
  lessons: LessonImportRow[]
}
