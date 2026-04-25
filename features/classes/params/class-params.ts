import { parseAsInteger, parseAsString, createSearchParamsCache } from "nuqs/server";

export const classParamsSchema = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(12),
  q: parseAsString.withDefault(""),
  isActive: parseAsString.withDefault("all"),
  order: parseAsString.withDefault("DESC"),
};

export const classSearchParamsCache = createSearchParamsCache(classParamsSchema);
