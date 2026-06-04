"use server"

import { api } from "@/lib/api"
import { buildClassesApiQuery } from "../lib/classes-api-query"
import type { ClassesSearchParams } from "../lib/load-classes-search-params"

export type ClassStats = {
  totalClasses: number
  activeClassesOnPage: number
  studentCountOnPage: number
  upcomingClassesOnPage: number
  currentPage: number
  totalPages: number
  limit: number
}

export async function getClassStats(
  params: ClassesSearchParams
): Promise<ClassStats> {
  return api<ClassStats>("/api/v1/classes/stats", {
    query: buildClassesApiQuery(params),
  })
}
