"use server";

import { api } from "@/lib/api";
import { PaginatedResponse } from "@/types/api";
import { Class } from "@/types/class";

export async function getClasses(params?: Record<string, any>): Promise<PaginatedResponse<Class>> {
  const cleanParams = params ? Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== "" && v !== null && v !== undefined && v !== "all")
  ) : {};

  const result = await api<PaginatedResponse<Class>>("/api/v1/classes", {
    method: "GET",
    query: cleanParams,
  });

  console.log("result", result);

  return result;
}
