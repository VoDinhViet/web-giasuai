"use server"

import { api } from "@/lib/api"
import type { ClassSession } from "../types"

export async function getClassSessions(
  classCode: string
): Promise<ClassSession[]> {
  return api<ClassSession[]>(`/api/v1/classes/${classCode}/sessions`)
}
