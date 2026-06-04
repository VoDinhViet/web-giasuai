"use server"

import { api } from "@/lib/api"
import type { ClassDetail } from "../types"

export async function getClass(classCode: string): Promise<ClassDetail> {
  return api<ClassDetail>(`/api/v1/classes/${classCode}`)
}
