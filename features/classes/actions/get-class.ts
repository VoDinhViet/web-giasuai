import { api } from "@/lib/api"
import type { ClassDetail } from "../types"
import { classDetailCacheTag } from "../utils/class-cache.util"

export async function getClass(classCode: string): Promise<ClassDetail> {
  return api<ClassDetail>(`/api/v1/classes/${classCode}`, {
    next: {
      tags: [classDetailCacheTag(classCode)],
    },
  })
}
