import { api } from "@/lib/api"
import type { Class } from "../types"
import { classDetailCacheTag } from "../utils/class-cache.util"

export async function getClass(classCode: string): Promise<Class> {
  return api<Class>(`/api/v1/classes/${classCode}`, {
    next: {
      tags: [classDetailCacheTag(classCode)],
    },
  })
}
