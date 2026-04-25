"use server";

import { api } from "@/lib/api";
import { Class } from "@/types/class";

export async function getClassByCode(code: string): Promise<Class> {
  return api<Class>(`/api/v1/classes/code/${code}`, {
    method: "GET",
  });
}
