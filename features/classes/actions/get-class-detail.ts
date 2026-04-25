"use server";

import { api } from "@/lib/api";
import { Class } from "../types/class.type";

export async function getClassDetail(classId: string): Promise<Class> {
  const result = await api<Class>(`/api/v1/classes/${classId}`, {
    method: "GET",
  });

  return result;
}
