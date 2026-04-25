"use server";

import { api } from "@/lib/api";
import { ClassStatistics } from "@/types/class";

export async function getClassStatistics(): Promise<ClassStatistics> {
  return api<ClassStatistics>("/api/v1/classes/statistics", {
    method: "GET",
  });
}
