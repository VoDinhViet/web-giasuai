import { parseAsInteger, parseAsString } from "nuqs"

export const suppliersSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  supplierGroupId: parseAsString.withDefault("all"),
}
