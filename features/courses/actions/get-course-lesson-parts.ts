"use server";

import { api } from "@/lib/api";
import { cleanObject } from "@/lib/utils";
import type { LessonPart } from "@/features/courses/types/lesson-part.type";
import type { PaginatedResponse } from "@/types/api";

interface GetCourseLessonPartsParams {
  page?: number;
  limit?: number;
}

export async function getCourseLessonParts(
  courseId: string,
  lessonId: string,
  params: GetCourseLessonPartsParams = {},
): Promise<PaginatedResponse<LessonPart>> {
  return await api<PaginatedResponse<LessonPart>>(
    `/api/v1/courses/${courseId}/lessons/${lessonId}`,
    {
      method: "GET",
      query: cleanObject(params),
    },
  );
}
