"use server"

import { api } from "@/lib/api"
import type { Course } from "../types"

export async function getCourse(courseId: string): Promise<Course> {
  return api<Course>(`/api/v1/courses/${courseId}`)
}
