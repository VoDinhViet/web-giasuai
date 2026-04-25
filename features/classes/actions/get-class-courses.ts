"use server";

import { api } from "@/lib/api";
import { cleanObject } from "@/lib/utils";
import type { PaginatedResponse } from "@/types/api";
import type {
  Course,
  CoursesResponse,
  GetCoursesParams,
} from "../types/course.type";

export async function getClassCourses(
  classId: string,
  params: Partial<GetCoursesParams> = {},
): Promise<CoursesResponse> {
  const result = await api<PaginatedResponse<Course>>(`/api/v1/classes/${classId}/courses`, {
    method: "GET",
    query: cleanObject(params),
  });

  return result;
}
