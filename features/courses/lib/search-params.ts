import { parseAsInteger, parseAsString } from "nuqs"

export const coursesSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  status: parseAsString.withDefault("all"),
  category: parseAsString.withDefault("all"),
}
