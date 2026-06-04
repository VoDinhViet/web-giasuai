import { z } from "zod"

export const lessonExerciseQuestionSchema = z.object({
  questionId: z.string().trim().optional(),
  questionText: z.string().trim().min(1),
  options: z.array(z.string().trim().min(1)).min(2),
  correctOptionIndex: z.number().min(0),
  explanation: z.string().trim().optional(),
  point: z.number().min(0).default(1),
  order: z.number().min(0),
})

export const updateLessonExerciseSchema = z.object({
  title: z.string().trim().min(1),
  maxScore: z.number().min(0),
  passingScore: z.number().min(0),
  questions: z.array(lessonExerciseQuestionSchema).length(10),
})

export type UpdateLessonExerciseInput = z.infer<
  typeof updateLessonExerciseSchema
>
