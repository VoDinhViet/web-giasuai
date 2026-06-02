import { createLoader, parseAsInteger, parseAsString } from "nuqs/server"

export const productsServerSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  clientId: parseAsString.withDefault("all"),
  itemType: parseAsString.withDefault("all"),
  status: parseAsString.withDefault("all"),
}

export const loadProductsSearchParams = createLoader(productsServerSearchParams)

export type ProductsSearchParams = Awaited<
  ReturnType<typeof loadProductsSearchParams>
>
