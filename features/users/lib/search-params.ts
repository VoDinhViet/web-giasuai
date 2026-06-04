import { parseAsInteger, parseAsString } from "nuqs"

export const usersSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  role: parseAsString.withDefault("all"),
  isLocked: parseAsString.withDefault("all"),
}
