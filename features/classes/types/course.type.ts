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
  shortDescription: Nullable<string>;
  thumbnailUrl: Nullable<string>;
  introVideoUrl: Nullable<string>;
  teacherId: Nullable<string>;
  level: CourseLevel;
  price: number;
  estimatedDurationMinutes: number;
  tags: string[];
  learningOutcomes: string[];
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type GetCoursesParams = CourseAssignParams;

export type CoursesResponse = PaginatedResponse<Course>;
