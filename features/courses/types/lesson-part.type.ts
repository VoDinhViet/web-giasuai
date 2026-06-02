export type LessonPartType = "PDF" | "DOCX";

export interface LessonPart {
  id: string;
  lessonId: string;
  title: string;
  partType: LessonPartType;
  fileUrl: string;
  position: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
