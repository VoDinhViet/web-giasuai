"use server"

import { api } from "@/lib/api"

export type ClassStats = {
  total: number
  learners: number
  upcoming: number
}

export async function getClassStats(): Promise<ClassStats> {
  return api<ClassStats>("/api/v1/classes/stats")
}
