"use server";

import { api } from "@/lib/api";

export async function getClassCourseIds(classId: string): Promise<string[]> {
  const result = await api<string[]>(`/api/v1/classes/${classId}/course-ids`, {
    method: "GET",
  });

  return result;
}
