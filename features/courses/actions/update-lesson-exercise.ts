"use server"

import { api } from "@/lib/api"
import {
  updateLessonExerciseSchema,
  type UpdateLessonExerciseInput,
} from "../schemas/lesson-exercise.schema"
import type { LessonExercise } from "../types"
import { revalidateCoursePaths } from "../utils/course-revalidation.util"

export async function updateLessonExercise(
  courseCode: string,
  lessonCode: string,
  input: UpdateLessonExerciseInput
): Promise<LessonExercise> {
  const reqDto = updateLessonExerciseSchema.parse(input)
  const exercise = await api<LessonExercise>(
    `/api/v1/courses/${courseCode}/lessons/${lessonCode}/exercise`,
    {
      method: "PUT",
      body: {
        title: reqDto.title,
        maxScore: reqDto.maxScore,
        passingScore: reqDto.passingScore,
        questions: reqDto.questions,
      },
    }
  )

  revalidateCoursePaths(courseCode, lessonCode)

  return exercise
}
