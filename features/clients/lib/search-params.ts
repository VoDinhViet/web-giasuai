import { parseAsInteger, parseAsString } from "nuqs"

export const clientsSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  clientType: parseAsString.withDefault("all"),
}
