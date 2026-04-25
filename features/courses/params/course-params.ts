import {
  createSearchParamsCache,
  parseAsInteger,
  type inferParserType,
} from "nuqs/server";

export const courseParamsSchema = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
};

export type CourseParams = inferParserType<typeof courseParamsSchema>;

export const courseParamsCache = createSearchParamsCache(courseParamsSchema);
