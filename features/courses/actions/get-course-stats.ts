"use server"

import { api } from "@/lib/api"

export type CourseStats = {
  total: number
  published: number
  enrolledLearners: number
  totalDurationMinutes: number
  upcomingStartCount: number
}

export async function getCourseStats(): Promise<CourseStats> {
  return api<CourseStats>("/api/v1/courses/stats")
}
