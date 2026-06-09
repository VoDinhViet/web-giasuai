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
