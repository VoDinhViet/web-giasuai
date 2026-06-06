import { createLoader, parseAsInteger, parseAsString } from "nuqs/server"

export const classesServerSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  status: parseAsString.withDefault("all"),
  courseId: parseAsString.withDefault("all"),
  instructorId: parseAsString.withDefault("all"),
}

export const classDetailServerSearchParams = {
  learnerPageSize: parseAsInteger.withDefault(10),
  learnerPage: parseAsInteger.withDefault(1),
  learnerQ: parseAsString.withDefault(""),
  coursePageSize: parseAsInteger.withDefault(10),
  coursePage: parseAsInteger.withDefault(1),
  courseQ: parseAsString.withDefault(""),
}

export const loadClassesSearchParams = createLoader(classesServerSearchParams)

export const loadClassDetailSearchParams = createLoader(
  classDetailServerSearchParams
)

export type ClassesSearchParams = Awaited<
  ReturnType<typeof loadClassesSearchParams>
>

export type ClassDetailSearchParams = Awaited<
  ReturnType<typeof loadClassDetailSearchParams>
>
