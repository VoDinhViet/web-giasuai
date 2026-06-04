"use server"

import { api } from "@/lib/api"
import type { CourseStructure } from "../types"

export async function getCourseStructure(
  courseCode: string
): Promise<CourseStructure> {
  return api<CourseStructure>(`/api/v1/courses/${courseCode}/structure`)
}
