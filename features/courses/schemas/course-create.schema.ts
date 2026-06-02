import { z } from "zod";

export const createCourseBasicSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Tiêu đề khóa học phải có ít nhất 5 ký tự")
    .max(200, "Tiêu đề tối đa 200 ký tự"),
  description: z
    .string()
    .trim()
    .max(5000, "Mô tả tối đa 5000 ký tự")
    .optional(),
  tags: z.string().optional(),
  learningOutcomes: z.string().optional(),
  isPublished: z.boolean().default(false),
  thumbnail: z.custom<File | null>().nullable().optional(),
});

export type CreateCourseBasicInput = z.input<typeof createCourseBasicSchema>;
