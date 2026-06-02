import { parseAsInteger, parseAsString } from "nuqs"

export const ordersSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  clientId: parseAsString.withDefault("all"),
  status: parseAsString.withDefault("all"),
}
