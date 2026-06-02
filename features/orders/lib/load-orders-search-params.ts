import { createLoader, parseAsInteger, parseAsString } from "nuqs/server"

export const ordersServerSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  clientId: parseAsString.withDefault("all"),
  status: parseAsString.withDefault("all"),
}

export const loadOrdersSearchParams = createLoader(ordersServerSearchParams)

export type OrdersSearchParams = Awaited<
  ReturnType<typeof loadOrdersSearchParams>
>
