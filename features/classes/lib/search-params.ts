import { parseAsInteger, parseAsString } from "nuqs"

export const classesSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  status: parseAsString.withDefault("all"),
  courseId: parseAsString.withDefault("all"),
  teacherId: parseAsString.withDefault("all"),
}
