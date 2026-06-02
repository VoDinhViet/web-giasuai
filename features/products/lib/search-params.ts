import { parseAsInteger, parseAsString } from "nuqs"

export const productsSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  clientId: parseAsString.withDefault("all"),
  itemType: parseAsString.withDefault("all"),
  status: parseAsString.withDefault("all"),
}
