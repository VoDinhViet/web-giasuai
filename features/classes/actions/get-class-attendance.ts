"use server"

import { api } from "@/lib/api"
import type { ClassAttendance } from "../types"

export async function getClassAttendance(
  classCode: string,
  sessionCode: string
): Promise<ClassAttendance> {
  return api<ClassAttendance>(
    `/api/v1/classes/${classCode}/sessions/${sessionCode}/attendance`
  )
}
