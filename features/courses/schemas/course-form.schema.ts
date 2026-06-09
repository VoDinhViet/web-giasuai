import { z } from "zod"

import { courseLevelSchema, courseStatusSchema } from "./course-base.schema"
import {
  createCourseChapterSchema,
  createLessonSchema,
} from "./course-structure.schema"

export const updateCourseSchema = z.object({
  code: z.string().trim().min(1, { message: "Vui lòng nhập mã khóa học" }),
  name: z.string().trim().min(1, { message: "Vui lòng nhập tên khóa học" }),
  category: z.string().trim().min(1, { message: "Vui lòng nhập danh mục" }),
  description: z.string().trim().max(2000).optional(),
  audience: z.string().trim().max(1000).optional(),
  level: courseLevelSchema,
  durationMinutes: z.number().min(0),
  startDate: z.string().trim().optional(),
  status: courseStatusSchema,
})

export const createCourseSchema = updateCourseSchema.extend({
  chapters: z.array(createCourseChapterSchema).optional(),
  lessons: z.array(createLessonSchema).optional(),
})

export type CreateCourseInput = z.infer<typeof createCourseSchema>
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>
