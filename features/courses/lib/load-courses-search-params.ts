import { createLoader, parseAsInteger, parseAsString } from "nuqs/server"

export const coursesServerSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  status: parseAsString.withDefault("all"),
  category: parseAsString.withDefault("all"),
}

export const loadCoursesSearchParams = createLoader(coursesServerSearchParams)

export type CoursesSearchParams = Awaited<
  ReturnType<typeof loadCoursesSearchParams>
>
