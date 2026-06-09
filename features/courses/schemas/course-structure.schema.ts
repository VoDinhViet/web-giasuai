import { z } from "zod"

import { lessonStatusSchema, lessonTypeSchema } from "@/features/lessons/schemas"

export const createCourseChapterSchema = z.object({
  chapterCode: z.string().trim().optional(),
  chapterTitle: z.string().trim().min(1),
  order: z.number().min(0).optional(),
})

export const updateCourseChapterSchema = z.object({
  chapterTitle: z.string().trim().min(1).optional(),
  order: z.number().min(0).optional(),
})

export const createLessonSchema = z.object({
  chapterCode: z.string().trim().optional(),
  lessonCode: z.string().trim().min(1),
  lessonTitle: z.string().trim().min(1),
  lessonType: lessonTypeSchema.optional(),
  durationMinutes: z.number().min(0).optional(),
  status: lessonStatusSchema.optional(),
  resourceCount: z.number().min(0).optional(),
  position: z.number().min(0).optional(),
})

export const updateLessonSchema = z.object({
  chapterCode: z.string().trim().optional(),
  lessonCode: z.string().trim().min(1).optional(),
  lessonTitle: z.string().trim().min(1).optional(),
  lessonType: lessonTypeSchema.optional(),
  durationMinutes: z.number().min(0).optional(),
  status: lessonStatusSchema.optional(),
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
export type CreateLessonInput = z.infer<typeof createLessonSchema>
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>
export type ReorderCourseStructureInput = z.infer<
  typeof reorderCourseStructureSchema
>
