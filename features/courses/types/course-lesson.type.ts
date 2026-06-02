export interface CourseLesson {
  id: string;
  sectionId: string;
  title: string;
  durationMinutes: number;
  position: number;
  isPreview: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
