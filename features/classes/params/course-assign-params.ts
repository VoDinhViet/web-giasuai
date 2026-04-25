import { parseAsInteger, parseAsString, createSearchParamsCache, type InferRenderType } from "nuqs/server";

export const courseAssignParamsSchema = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(12),
  q: parseAsString.withDefault(""),
};

export type CourseAssignParams = InferRenderType<typeof courseAssignParamsSchema>;

export const courseAssignSearchParamsCache = createSearchParamsCache(courseAssignParamsSchema);
