import { z } from "zod";
import type {
  FormStateOf,
  FormValuesOf,
} from "@/features/shared/types/form";
import { FormApi } from "@tanstack/react-form";

/**
 * Course Level Enumeration (Difficulty)
 */
export const CourseLevelSchema = z.enum([
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
  "ALL_LEVELS",
]);

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
 * Create Course Schema: The complete validation object for course creation
 */
export const createCourseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, { message: "Tiêu đề khóa học phải có ít nhất 5 ký tự" }),
  description: z
    .string()
    .trim()
    .min(20, { message: "Mô tả chi tiết phải có ít nhất 20 ký tự" }),
  
  levelId: z.string().min(1, "Vui lòng chọn cấp học"),
  gradeId: z.string().optional(),
  majorId: z.string().optional(),
  subjectId: z.string().min(1, "Vui lòng chọn môn học"),
  
  learningOutcomes: z.array(z.string()).default([]),
  thumbnail: z.any().nullable().default(null),
});

/**
 * Update Course Schema: All fields are optional
 */
export const updateCourseSchema = createCourseSchema.partial();

/**
 * Curriculum Schema: Used for the standalone curriculum editor
 */
export const courseCurriculumSchema = z.object({
  courseSections: z.array(courseSectionSchema).default([]),
});

/**
 * Types inferred directly from schemas
 */
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type CreateCourseSection = z.infer<typeof courseSectionSchema>;
export type CreateCourseFormValues = z.input<typeof createCourseSchema>;
export type CourseCurriculumFormValues = z.input<typeof courseCurriculumSchema>;

/**
 * Form API Types - Using explicit FormApi type to satisfy shared utility constraints
 */
export type CourseFormApi = FormApi<
  CreateCourseFormValues,
  any, any, any, any, any, any, any, any, any, any, any
>;
export type CourseCurriculumFormApi = FormApi<
  CourseCurriculumFormValues,
  any, any, any, any, any, any, any, any, any, any, any
>;
export type CourseFormState = FormStateOf<CourseFormApi>;
export type CourseFormValues = FormValuesOf<CourseFormApi>;

/**
 * Course Curriculum Sync Schema (New)
 */
export const courseCurriculumSyncSchema = z.object({
  courseSections: z.array(courseSectionSchema).min(1, "Khóa học phải có ít nhất một chương học"),
});

export type CourseCurriculumSyncValues = z.input<typeof courseCurriculumSyncSchema>;
export type CourseCurriculumSyncFormApi = FormApi<
  CourseCurriculumSyncValues,
  any, any, any, any, any, any, any, any, any, any, any
>;
