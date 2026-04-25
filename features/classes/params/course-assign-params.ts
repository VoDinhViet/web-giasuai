import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  type inferParserType,
} from "nuqs/server";

export const courseAssignParamsSchema = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(12),
  q: parseAsString.withDefault(""),
};

export type CourseAssignParams = inferParserType<
  typeof courseAssignParamsSchema
>;

export const courseAssignSearchParamsCache = createSearchParamsCache(courseAssignParamsSchema);
