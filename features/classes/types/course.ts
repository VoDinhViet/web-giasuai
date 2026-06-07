export type ClassCourse = {
  courseId: string
  courseCode: string
  courseName: string
  lessonCount: number
  completedLessons: number
  required: boolean
}

export type UnassignedClassCourse = {
  id: string
  code: string
  name: string
  category: string
  lessonCount: number
}


