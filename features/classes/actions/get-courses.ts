"use server";

import { api } from "@/lib/api";
import { cleanObject } from "@/lib/utils";
import type { PaginatedResponse, PaginationInfo } from "@/types/api";
import type {
  Course,
  CoursesResponse,
  GetCoursesParams,
} from "../types/course.type";

export async function getCourses(
  params: Partial<GetCoursesParams> = {},
): Promise<CoursesResponse> {
  const result = await api<PaginatedResponse<Course>>("/api/v1/courses", {
    method: "GET",
    query: cleanObject(params),
  });

  return result;
}
