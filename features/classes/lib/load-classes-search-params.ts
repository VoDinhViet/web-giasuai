import { createLoader, parseAsInteger, parseAsString } from "nuqs/server"

export const classesServerSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  status: parseAsString.withDefault("all"),
  courseId: parseAsString.withDefault("all"),
  teacherId: parseAsString.withDefault("all"),
}

export const loadClassesSearchParams = createLoader(classesServerSearchParams)

export type ClassesSearchParams = Awaited<
  ReturnType<typeof loadClassesSearchParams>
>
