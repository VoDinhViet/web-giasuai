import { z } from "zod"

import { lessonStatusSchema } from "./lesson-base.schema"
import { updateLessonExerciseSchema } from "./lesson-exercise.schema"

export const lessonTheoryPartSchema = z.object({
  partId: z.string().trim().optional(),
  title: z.string().trim().min(1),
  content: z.string().trim().optional(),
  order: z.number().min(0),
})

export const lessonSimulationSchema = z.object({
  simulationId: z.string().trim().optional(),
  title: z.string().trim().optional(),
  previewUrl: z.string().trim().url().optional(),
  launchUrl: z.string().trim().url().optional(),
  status: z.enum(["READY", "PROCESSING", "FAILED"]).optional(),
})

export const updateLessonContentSchema = z.object({
  summary: z.string().trim().optional(),
  theoryParts: z.array(lessonTheoryPartSchema).optional(),
  simulation: lessonSimulationSchema.optional(),
  exercise: updateLessonExerciseSchema.optional(),
})

export const publishLessonSchema = z.object({
  status: lessonStatusSchema,
})

export type UpdateLessonContentInput = z.infer<typeof updateLessonContentSchema>
export type PublishLessonInput = z.infer<typeof publishLessonSchema>
