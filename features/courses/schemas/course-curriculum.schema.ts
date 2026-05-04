import { z } from "zod";

/**
 * Lesson Part Schema: Basic unit of a lesson
 */
export const lessonPartSchema = z.object({
  title: z.string().min(1, "Tên phiên học không được để trống"),
  file: z.any().nullable().default(null),
});

/**
 * Lesson Schema: Contains multiple lesson parts and configuration
 */
export const lessonSchema = z.object({
  title: z.string().min(1, "Tên bài học không được để trống"),
  lessonParts: z.array(lessonPartSchema).default([]),
});

/**
 * Chapter Schema: Groups multiple lessons
 */
export const courseSectionSchema = z.object({
  title: z.string().min(1, "Tên phần học không được để trống"),
  lessons: z.array(lessonSchema).default([]),
});

/**
 * Curriculum Schema: Used for the standalone curriculum editor
 */
export const courseCurriculumSchema = z.object({
  courseSections: z.array(courseSectionSchema).default([]),
});

/**
 * Course Curriculum Sync Schema (New)
 */
export const courseCurriculumSyncSchema = z.object({
  courseSections: z.array(courseSectionSchema).min(1, "Khóa học phải có ít nhất một chương học"),
});

/**
 * Types inferred directly from schemas
 */
export type CreateCourseSection = z.infer<typeof courseSectionSchema>;
export type CourseCurriculumFormValues = z.input<typeof courseCurriculumSchema>;
export type CourseCurriculumSyncValues = z.input<typeof courseCurriculumSyncSchema>;
