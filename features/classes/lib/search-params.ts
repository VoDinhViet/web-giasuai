import { parseAsInteger, parseAsString } from "nuqs"

export const classesSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  status: parseAsString.withDefault("all"),
  courseId: parseAsString.withDefault("all"),
  instructorId: parseAsString.withDefault("all"),
}

export const classDetailSearchParams = {
  learnerPageSize: parseAsInteger.withDefault(10),
  learnerPage: parseAsInteger.withDefault(1),
  learnerQ: parseAsString.withDefault(""),
  coursePageSize: parseAsInteger.withDefault(10),
  coursePage: parseAsInteger.withDefault(1),
  courseQ: parseAsString.withDefault(""),
}

export const assignClassCourseSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
}
