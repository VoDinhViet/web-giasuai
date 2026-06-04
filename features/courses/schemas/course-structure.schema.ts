import { z } from "zod"

import {
  courseLessonStatusSchema,
  courseLessonTypeSchema,
} from "./course-base.schema"

export const createCourseChapterSchema = z.object({
  chapterCode: z.string().trim().optional(),
  chapterTitle: z.string().trim().min(1),
  order: z.number().min(0).optional(),
})

export const updateCourseChapterSchema = z.object({
  chapterTitle: z.string().trim().min(1).optional(),
  order: z.number().min(0).optional(),
})

export const createCourseLessonSchema = z.object({
  chapterCode: z.string().trim().optional(),
  lessonCode: z.string().trim().min(1),
  lessonTitle: z.string().trim().min(1),
  lessonType: courseLessonTypeSchema.optional(),
  durationMinutes: z.number().min(0).optional(),
  status: courseLessonStatusSchema.optional(),
  resourceCount: z.number().min(0).optional(),
  position: z.number().min(0).optional(),
})

export const updateCourseLessonSchema = z.object({
  chapterCode: z.string().trim().optional(),
  lessonCode: z.string().trim().min(1).optional(),
  lessonTitle: z.string().trim().min(1).optional(),
  lessonType: courseLessonTypeSchema.optional(),
  durationMinutes: z.number().min(0).optional(),
  status: courseLessonStatusSchema.optional(),
  resourceCount: z.number().min(0).optional(),
  position: z.number().min(0).optional(),
})

export const reorderCourseStructureSchema = z.object({
  chapters: z
    .array(
      z.object({
        chapterCode: z.string().trim().min(1),
        order: z.number().min(0),
      })
    )
    .optional(),
  lessons: z
    .array(
      z.object({
        lessonCode: z.string().trim().min(1),
        chapterCode: z.string().trim().min(1).optional(),
        order: z.number().min(0),
      })
    )
    .optional(),
})

export type CreateCourseChapterInput = z.infer<
  typeof createCourseChapterSchema
>
export type UpdateCourseChapterInput = z.infer<
  typeof updateCourseChapterSchema
>
export type CreateCourseLessonInput = z.infer<typeof createCourseLessonSchema>
export type UpdateCourseLessonInput = z.infer<typeof updateCourseLessonSchema>
export type ReorderCourseStructureInput = z.infer<
  typeof reorderCourseStructureSchema
>
