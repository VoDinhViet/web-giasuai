import type { Nullable } from "@/types/api";

export type CourseLevel =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED"
  | "ALL_LEVELS";

export interface CourseContent {
  id: string;
  title: string;
  slug: string;
  description: Nullable<string>;
  thumbnailUrl: Nullable<string>;
  tags: string[];
  learningOutcomes: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
