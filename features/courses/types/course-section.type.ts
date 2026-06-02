import type { CourseLesson } from "./course-lesson.type";

export interface CourseSection {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseSectionWithLessons extends CourseSection {
  lessons: CourseLesson[];
}
