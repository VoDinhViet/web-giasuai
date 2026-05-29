import { createLoader, parseAsInteger, parseAsString } from "nuqs/server"

export const suppliersServerSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
}

export const loadSuppliersSearchParams = createLoader(
  suppliersServerSearchParams
)

export type SuppliersSearchParams = Awaited<
  ReturnType<typeof loadSuppliersSearchParams>
>
