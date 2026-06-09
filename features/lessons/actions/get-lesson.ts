"use server"

import { api } from "@/lib/api"
import type { Lesson } from "@/features/lessons/types"

export async function getLesson(lessonId: string): Promise<Lesson> {
  return api<Lesson>(`/api/v1/lessons/${lessonId}`)
}
