import { createLoader, parseAsInteger, parseAsString } from "nuqs/server"

export const clientsServerSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  clientType: parseAsString.withDefault("all"),
}

export const loadClientsSearchParams = createLoader(clientsServerSearchParams)

export type ClientsSearchParams = Awaited<
  ReturnType<typeof loadClientsSearchParams>
>
