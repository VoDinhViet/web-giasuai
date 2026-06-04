"use server"

import { api } from "@/lib/api"
import type { CourseDetail } from "../types"

export async function getCourse(courseCode: string): Promise<CourseDetail> {
  return api<CourseDetail>(`/api/v1/courses/${courseCode}`)
}
