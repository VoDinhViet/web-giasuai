"use server"

import { api } from "@/lib/api"
import type { ClassEnrollment } from "../types"

export async function getClassEnrollments(
  classCode: string
): Promise<ClassEnrollment[]> {
  return api<ClassEnrollment[]>(`/api/v1/classes/${classCode}/enrollments`)
}
