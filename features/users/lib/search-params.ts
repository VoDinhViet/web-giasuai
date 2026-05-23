import { parseAsInteger, parseAsString } from "nuqs"

export const usersSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  search: parseAsString.withDefault(""),
  position: parseAsString.withDefault("all"),
  status: parseAsString.withDefault("all"),
}
