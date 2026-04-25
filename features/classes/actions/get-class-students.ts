"use server";

import { api } from "@/lib/api";
import { PaginatedResponse } from "@/types/api";
import { User } from "@/types/user";

interface GetClassStudentsParams {
  page?: number;
  limit?: number;
}

export async function getClassStudents(
  classId: string,
  params?: GetClassStudentsParams
): Promise<PaginatedResponse<User>> {
  const cleanParams = params
    ? Object.fromEntries(
        Object.entries(params).filter(
          ([, value]) => value !== null && value !== undefined
        )
      )
    : {};

  return api<PaginatedResponse<User>>(`/api/v1/classes/${classId}/students`, {
    method: "GET",
    query: cleanParams,
  });
}
