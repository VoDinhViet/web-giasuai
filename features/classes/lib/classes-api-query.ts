import type { ClassesSearchParams } from "./load-classes-search-params"

export function buildClassesApiQuery(params: ClassesSearchParams) {
  return {
    page: params.page,
    limit: params.limit,
    q: params.q || undefined,
    status: params.status === "all" ? undefined : params.status,
    courseId: params.courseId === "all" ? undefined : params.courseId,
    teacherId: params.teacherId === "all" ? undefined : params.teacherId,
  }
}
