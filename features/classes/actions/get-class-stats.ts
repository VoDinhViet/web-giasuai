"use server";

import { api } from "@/lib/api";
import { ClassDetailStats } from "../types/class-stats.type";

export async function getClassStats(classId: string): Promise<ClassDetailStats> {
  const result = await api<ClassDetailStats>(`/api/v1/classes/${classId}/stats`, {
    method: "GET",
  });

  return result;
}
