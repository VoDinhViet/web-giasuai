import { z } from "zod";

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
 * Types inferred directly from schemas
 */
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type CreateCourseFormValues = z.input<typeof createCourseSchema>;
