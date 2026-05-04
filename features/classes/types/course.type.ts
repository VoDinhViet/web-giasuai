import type { PaginatedResponse, Nullable } from "@/types/api";
import { type CourseAssignParams } from "../params/course-assign-params";

export type CourseLevel =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED"
  | "ALL_LEVELS";

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: Nullable<string>;
  thumbnailUrl: Nullable<string>;
  tags: string[];
  learningOutcomes: string[];
  isPublished: boolean;
  schoolLevelId: Nullable<string>;
  gradeId: Nullable<string>;
  majorId: Nullable<string>;
  subjectId: Nullable<string>;
  createdAt?: string;
  updatedAt?: string;
}

export type GetCoursesParams = CourseAssignParams;

export type CoursesResponse = PaginatedResponse<Course>;
